<template>
  <div class="section flex flex-wrap justify-center">
    <div class="max-w-5xl w-full">
      <div class="p-4 lg:p-12">
        <div class="text-xs">
          Case Study
        </div>

        <h1 class="text-4xl lg:text-6xl">
          SocialCode
        </h1>

        <p>
          SocialCode combines audience data, insights, creative and measurement
          to drive superior performance for leading brands. As the first-ever
          Facebook Ads API partner, SocialCode pioneered digital-first
          marketing, combining institutional media buying expertise, proprietary
          tech and creative service.
        </p>
      </div>

      <div
        class="bg-black flex flex-wrap h-64 md:h-140 justify-center items-center"
      >
        <div class="w-1/2">
          <SocialCodeLogo class="fill-white h-auto w-full" />
        </div>
      </div>

      <div class="p-4 lg:p-12">
        <h4>Challenge</h4>

        <p>
          SocialCode has a unique "micro apps" setup, which comes with unique
          challenges like managing common dependencies across apps, enforcing
          coding standards, and avoiding duplication. With different teams in
          charge of each app, it is common to use different approaches, and make
          different decisions on whether to hand roll something or use an Ember
          addon. It also makes keeping all apps on the latest Ember version a
          challenge.
        </p>
      </div>

      <div class="p-4 lg:p-12">
        <h4>Solution</h4>

        <p>
          We started by moving common dependencies to a common addon, and
          ensuring all apps adhered to the same standards by enforcing the
          latest eslint-plugin-ember rules. We also migrated all the code to use
          the new modules syntax, and new testing syntax, and updated apps to
          the latest Ember version to make sure we were on the latest and
          greatest of everything.
        </p>

        <p>
          There was quite a lot of custom code hanging around, in the SocialCode
          apps, that could be replaced with some addons that did not exist when
          the apps were created. We refactored large chunks of code to use these
          addons, such as a refactor from a custom select to ember-power-select,
          and other similar refactors, to reduce the amount of in house code
          that needed to be maintained, and improve the stability of the apps
          going forward.
        </p>
      </div>

      <div class="p-4 lg:p-12">
        <h4>Outcome</h4>

        <p>
          With dependencies moved to a common Ember addon, it is easier to
          ensure all apps are using the versions of these dependencies that they
          intended. It also helps ensure updating dependencies to new versions,
          and updating the code to use these new versions, is isolated to just
          one location, instead of searching all the apps for their usage.
        </p>

        <p>
          Removing custom, hand rolled, implementations, for things like
          dropdowns, and replacing them with Ember addons, reduces the burden of
          maintaining several internal implementations, and leverages the Ember
          community to ensure the code remains up to date.
        </p>

        <p>
          With all the apps on the latest Ember standards, future updates to new
          Ember versions will be easier, as the diffs will be smaller, and
          ember-cli-update will be able to automatically update things, without
          conflicts.
        </p>
      </div>

      <div class="bg-black flex justify-center lg:flex-1">
        <div class="pl-4 pr-4 pt-4 lg:pl-24 lg:pr-24 lg:pt-12">
          <img
            alt="SocialCode Audience Intelligence Platform"
            class="flex"
            src="/img/work/socialcode/aip.png"
          />
        </div>
      </div>

      <BottomLinks
        next-link="/work/netflix/"
        next-link-text="Netflix"
        previous-link="/work/brokermate/"
        previous-link-text="Brokermate"
      />
    </div>
  </div>
</template>

<script>
import BottomLinks from '~/components/BottomLinks.vue';
import SocialCodeLogo from '~/assets/svgs/clients/socialcode.svg?inline';
import { generateMeta } from '~/utils/meta';

export default {
  components: {
    BottomLinks,
    SocialCodeLogo
  },

  head() {
    const title = 'Case Study - SocialCode';
    const description =
      'Learn how we helped SocialCode organize multiple apps and addons into one core product.';
    const url = 'https://shipshape.io/work/socialcode/';

    return generateMeta(title, description, url);
  }
};
</script>
