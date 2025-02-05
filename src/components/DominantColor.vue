<template>
  <div class="dominant-color-container" :style="{ backgroundColor: dominantColor }">
    <img 
      @load="getDominantColor($event.target.src)" 
      :src="imageUrl" 
      :alt="alt"
      class="dominant-color-image"
    />
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  imageUrl: String,
  alt: {
    type: String,
    default: ''
  }
})

const dominantColor = ref('transparent')

const getDominantColor = (imgUrl) => {
  const img = new Image()
  img.crossOrigin = "Anonymous"
  
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    
    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    const colorCounts = {}
    
    for (let i = 0; i < imageData.length; i += 4) {
      const rgb = `rgb(${imageData[i]},${imageData[i+1]},${imageData[i+2]})`
      colorCounts[rgb] = (colorCounts[rgb] || 0) + 1
    }
    
    dominantColor.value = Object.entries(colorCounts).reduce((a, b) => 
      (a[1] > b[1] ? a : b)
    )[0]
  }
  
  img.src = imgUrl
}
</script>

<style scoped>
.dominant-color-container {
  transition: background-color 0.3s;
}

.dominant-color-image {
  display: block;
  width: 100%;
  height: auto;
}
</style>