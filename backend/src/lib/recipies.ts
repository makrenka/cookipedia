import _ from "lodash";

export const recipies = _.times(100, (i) => ({
  name: `Recipe ${i}`,
  description: `Recipe ${i} description...`,
  nick: `cool-recipe${i}`,
  text: _.times(
    100,
    (j) => `<p>Text paragraph ${j} of recipe ${i}...</p>`
  ).join(""),
}));
