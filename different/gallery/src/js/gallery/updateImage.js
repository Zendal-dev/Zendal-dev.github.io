import renderBody from "./renderBody";

const updateImages = async (tag, selector, apiKey) => {
   const url = `https://api.unsplash.com/search/photos?page=1&order_by=latest&query=${tag}&client_id=${apiKey}`,
      response = await fetch(url),
      images = await response.json();

   renderBody(images, selector);
};

export default updateImages;