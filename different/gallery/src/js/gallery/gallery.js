import tabs from "./tabs";
import renderHeader from "./renderHeader";

const gallery = (selector, apiKey) => {

   renderHeader('.gallery');
   tabs(apiKey, selector);
};

export default gallery;