<template>
  <div class="home">
    <fbx v-if='showStatus=="Fbx"' />
    <ds v-if='showStatus=="Ds"' />
    
  </div>
</template>

<script>
// @ is an alias to /src
import Fbx from '@/components/fbx.vue'
import Ds from '@/components/threeds.vue'

export default {
  name: 'HomeView',
  components: {
    Fbx,Ds
  },
  data: () => ({
    showStatus:'Ds'
	}),
}
</script>
