<template>
  <div>
    <HeroBlock class="home">
      <template v-slot:content>
        <h1>
          Welcome Aboard!
        </h1>

        <p>
          We specialize in custom software and app development by leveraging the
          latest in Ember.js, Nuxt and open source. Our passion lies in building
          full stack web apps, mentoring teams and providing impactful solutions
          for the development community.
        </p>
        <div>
          <nuxt-link to="/work/" class="btn btn-navy">
            Check out our work
          </nuxt-link>
        </div>
      </template>

      <template v-slot:icon>
        <LandingIcon class="m-auto max-w-2xl" />
      </template>
    </HeroBlock>

    <ProcessSection />

    <TechnologiesSection />

    <WorkedWith />

    <RecentBlogPosts :posts="posts" />
  </div>
</template>

<script>
import HeroBlock from '~/components/HeroBlock.vue';
import LandingIcon from '~/assets/svgs/hero-images/landing.svg?inline';
import ProcessSection from '~/components/ProcessSection.vue';
import RecentBlogPosts from '~/components/RecentBlogPosts.vue';
import TechnologiesSection from '~/components/TechnologiesSection.vue';
import WorkedWith from '~/components/WorkedWith.vue';
import { getBlogData } from '~/utils/blog';
import { generateMeta } from '~/utils/meta';

export default {
  components: {
    HeroBlock,
    LandingIcon,
    ProcessSection,
    RecentBlogPosts,
    TechnologiesSection,
    WorkedWith
  },
  async asyncData() {
    const { posts } = await getBlogData();
    return { posts: posts.slice(0, 3) };
  },
  head() {
    const title = 'App Development & Consulting Agency';
    const description =
      'Ship Shape is a consulting agency, specializing in app development, ' +
      'Ember.js and Nuxt. Hire us to deliver high-quality web apps that ' +
      'work across all devices.';
    const url = 'https://shipshape.io/';

    return generateMeta(title, description, url);
  }
};
</script>
