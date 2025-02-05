import { ref, createElementBlock, openBlock, normalizeStyle, createElementVNode } from 'vue';

const _hoisted_1 = ["src", "alt"];


var script = {
  __name: 'DominantColor',
  props: {
  imageUrl: String,
  alt: {
    type: String,
    default: ''
  }
},
  setup(__props) {

const dominantColor = ref('transparent');

const getDominantColor = (imgUrl) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorCounts = {};
    
    for (let i = 0; i < imageData.length; i += 4) {
      const rgb = `rgb(${imageData[i]},${imageData[i+1]},${imageData[i+2]})`;
      colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
    }
    
    dominantColor.value = Object.entries(colorCounts).reduce((a, b) => 
      (a[1] > b[1] ? a : b)
    )[0];
  };
  
  img.src = imgUrl;
};

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: "dominant-color-container",
    style: normalizeStyle({ backgroundColor: dominantColor.value })
  }, [
    createElementVNode("img", {
      onLoad: _cache[0] || (_cache[0] = $event => (getDominantColor($event.target.src))),
      src: __props.imageUrl,
      alt: __props.alt,
      class: "dominant-color-image"
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_1)
  ], 4 /* STYLE */))
}
}

};

script.__scopeId = "data-v-521569ba";
script.__file = "src/components/DominantColor.vue";

var index = {
  install: (app) => {
    app.component('DominantColor', script);
  }
};

export { index as default };
