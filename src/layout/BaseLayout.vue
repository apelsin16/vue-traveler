<template>
  <main class="flex h-screen">
    <section class="flex-1 flex justify-center items-center bg-primary px-5">
      <div class="max-w-[500px] w-full">
        <slot></slot>
      </div>
    </section>
    <section class="flex-1">
      <img
        class="h-full w-full object-cover"
        src="../assets/img/static-map.png"
        alt="static map"
      />
    </section>
  </main>
</template>
