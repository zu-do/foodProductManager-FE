import { Typography, Card, CardContent, CardMedia } from '@mui/material';

export const RecipeCard = ({ recipe }) => {
    return (
      <Card>
        <CardMedia
          component="img"
          alt={recipe.recipe.name}
          height="200"
          image={recipe.recipe.imageUrl}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {recipe.recipe.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ingredientai:
          </Typography>
          <ul>
            {recipe.recipe.ingredients.map((ingredient, index) => (
              <Typography variant="body2" component="li" key={index}>
                {ingredient}
              </Typography>
            ))}
          </ul>
          <Typography variant="h6" component="div">
            <a href={recipe.recipe.recipeUrl} target='_blank' style={{ textDecoration:"underline", color: "inherit" }}> Recepto nuoroda</a>
          </Typography>
          {recipe.product !== null ? 
          <>
            <Typography variant="h6" component="div">Jums trūksta vieno produkto receptui, tačiau jis yra atiduotuvėje</Typography>
            <Typography variant="body1" component="div">
            Produktas : {recipe.product.productName}
          </Typography>
          <Typography variant="body1" component="div">
            Produkto aprašymas: {recipe.product.productDescription}
          </Typography>
          </> : <></>}
        
        </CardContent>
      </Card>
    );
  };