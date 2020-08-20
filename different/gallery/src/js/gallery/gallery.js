import tabs from "./tabs";
import { renderHeader } from "./render";

const gallery = (selector, apiKey) => {

   renderHeader('.gallery');
   tabs(apiKey, selector);
};

export default gallery;