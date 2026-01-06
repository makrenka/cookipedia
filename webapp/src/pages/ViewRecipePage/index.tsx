import { useParams } from "react-router-dom";

export const ViewRecipePage = () => {
  const { recipeNick } = useParams() as { recipeNick: string };
  return (
    <div>
      <h1>{recipeNick}</h1>
      <p>Description of recipe 1...</p>
      <div>
        <p>Text paragraph 1 of recipe 1...</p>
        <p>Text paragraph 2 of recipe 1...</p>
        <p>Text paragraph 3 of recipe 1...</p>
      </div>
    </div>
  );
};
