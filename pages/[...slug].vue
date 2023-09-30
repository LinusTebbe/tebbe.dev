<template>
  <div class="content">
    <ContentDoc v-slot="{ doc }">
      <Card>
        <div class="w-full flex flex-wrap">
          <div class="w-full lg:w-1/2 xl:w-1/3">
            <h1>{{ doc.title }}</h1>
            <ProjectTimespan :project="doc"/>
          </div>
          <div class="w-full lg:w-1/2 xl:w-1/4 text-lg">
            {{ doc.description }}
          </div>
          <div class="w-full">
            <a v-if="doc.link" :href="doc.link" rel="noreferrer" target="_blank" class="gray-btn">Website</a>
          </div>
        </div>
      </Card>
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </div>
</template>

<style lang="scss">
.content {
  ul > li:before {
    content: "- ";
    text-indent: -5px;
    li {
      text-indent: -5px;
    }
  }
}
</style>