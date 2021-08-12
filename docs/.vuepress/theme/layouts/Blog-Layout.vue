<template>
  <div class="theme-container" :class="pageClasses" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <BlogNavbar v-if="shouldShowNavbar" />

    <div class="blog-layout">
      <ClientOnly>
        <BlogTags v-if="$route.path ==='/blog/'" :tags="$frontmatterKey.list" />
        <BlogList v-else-if="$pagination" />
        <Post v-else />
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import BlogNavbar from "@theme/components/BlogNavbar.vue";
import BlogList from "@theme/components/BlogList.vue";
import Post from "@theme/components/Post.vue";
import BlogTags from "@theme/components/BlogTags.vue";

export default {
  name: "Blog-Layout",

  components: {
    BlogNavbar,
    BlogList,
    BlogTags,
    Post,
  },

  data() {
    return {
      isSidebarOpen: false,
    };
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
        },
        userPageClass,
      ];
    },
  },

  methods: {
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
  },
};
</script>

<style lang="stylus">
.blog-layout {
  padding: 100px 15px 80px 15px;
  min-height: calc(100vh - 80px - 60px - 100px);
  max-width: 800px;
  margin: 0 auto;
}
</style>
