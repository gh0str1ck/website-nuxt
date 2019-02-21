const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { extname, resolve } = require('path');
const yamlFront = require('yaml-front-matter');
const walkSync = require('walk-sync');

const blogPosts = readdirSync('blog/posts/');

const _getBlogPosts = () => {
  const slugs = blogPosts.map((post) => {
    return post.slice(0, -3);
  });

  writeFileSync(
    resolve(__dirname, 'posts.json'),
    JSON.stringify(slugs, null, 2)
  );

  return slugs.map(slug => `/blog/${slug}`);
};

function _getAuthorURLs() {
  return walkSync('blog/authors')
    .map(file => file.replace(/\.md$/, ''))
    .map(id => `/blog/authors/${id}`);
}

function _getCategoryURLs() {
  const paths = walkSync('blog/posts');
  const postPaths = paths.filter(path => extname(path) === '.md');
  const postsFrontmatter = postPaths.map((path) => {
    return yamlFront.loadFront(readFileSync(`blog/posts/${path}`));
  });

  let categories = postsFrontmatter
    .map(post => post.categories)
    .reduce((a, b) => a.concat(b), [])
    .filter(x => !!x)
    .map(category => category.replace(' ', '-'));

  // Get only unique categories
  categories = [...new Set(categories)];

  return categories.map(category => `/blog/categories/${category}`);
}

const authorRoutes = _getAuthorURLs();
const blogPostRoutes = _getBlogPosts();
const categoryRoutes = _getCategoryURLs();
const blogRoutes = [...authorRoutes, ...categoryRoutes, ...blogPostRoutes];

const imgSrc = 'http://i.imgur.com/30OI4fv.png';
const twitterUsername = '@shipshapecode';

module.exports = {
  mode: 'universal',

  axios: {
    baseURL: 'https://suspicious-golick-63656d.netlify.com'
  },

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Ship Shape',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'referrer', content: 'unsafe-url' },
      { property: 'og:site_name', content: 'Ship Shape' },

      // Opengraph
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:image', property: 'og:image', content: imgSrc },
      { hid: 'og:image:type', property: 'og:image:type', content: 'image/png' },
      { hid: 'og:image:height', property: 'og:image:height', content: '256' },
      { hid: 'og:image:width', property: 'og:image:width', content: '256' },

      // Twitter
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: twitterUsername },
      { hid: 'twitter:creator', name: 'twitter:creator', content: twitterUsername },
      { hid: 'twitter:image:src', name: 'twitter:image:src', content: imgSrc }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.scss',
    'prismjs/themes/prism-okaidia.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/date-fns',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-purgecss',
    'nuxt-svg',
    ['nuxt-validate', {
      classes: true,
      classNames: {
        invalid: 'error'
      }
    }],
    '@nuxtjs/sitemap'
  ],

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,

    babel: {
      presets({ isServer }) {
        const targets = isServer ? { node: '10' } : {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Safari versions'
          ]
        };
        return [
          [require.resolve('@nuxt/babel-preset-app'), { targets }]
        ];
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: resolve(__dirname, 'blog')
      });
    }
  },

  dateFns: {
    locales: ['en'],
    defaultLocale: 'en',
    format: 'MM/DD/YYYY'
  },

  generate: {
    routes: []
      .concat(blogRoutes)
  },

  googleAnalytics: {
    id: 'UA-84561982-1'
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://shipshape.io',
    cacheTime: 1000 * 60 * 15,
    generate: true,
    routes: []
      .concat(blogRoutes)
  },

  styleResources: {
    scss: [
      './assets/css/_variables.scss'
    ]
  }
};
