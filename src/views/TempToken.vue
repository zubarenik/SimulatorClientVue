<template>
<div>
</div>
</template>
<script>

export default {
  name: "TempToken",
  mounted() {
    this.$store.dispatch("utility/ChangeLoading", true);
    
    this.$store.dispatch("user/TEMPLOGIN", {
      vm: this,
      code: this.$route.params.id,
    });
    
    this.$store.dispatch("utility/ChangeLoading", false);
  },
};
</script>