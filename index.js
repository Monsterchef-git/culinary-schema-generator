const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("👨‍🍳 CULINARY SCHEMA GENERATOR v2.0");

readline.question('1. ¿Nombre del plato? ', (nombre) => {
    readline.question('2. ¿Quién es el Chef autor? ', (autor) => { // <-- Nueva estación de trabajo
        readline.question('3. ¿Minutos de cocción? ', (minutos) => {
            readline.question('4. ¿Ingredientes? (Sepáralos por comas): ', (ingredientesInput) => {
                readline.question('5. ¿Pasos de la receta? (Sepáralos por comas): ', (pasosInput) => {

                    // PROCESAMIENTO: Picamos la data (Mise en Place)
                    const listaIngredientes = ingredientesInput.split(',').map(i => i.trim());
                    const listaPasos = pasosInput.split(',').map(p => p.trim());

                    // EMPLATADO SEMÁNTICO
                    const esquema = {
                        "@context": "https://schema.org",
                        "@type": "Recipe",
                        "name": nombre,
                        "author": {
                            "@type": "Person",
                            "name": autor // <-- Ahora usamos la respuesta de la terminal
                        },
                        "recipeIngredient": listaIngredientes,
                        "cookTime": `PT${minutos}M`,
                        "recipeInstructions": listaPasos.map(p => ({
                            "@type": "HowToStep",
                            "text": p
                        }))
                    };

                    console.log("\n--- ✅ JSON-LD GENERADO CON ÉXITO ---");
                    console.log(JSON.stringify(esquema, null, 2));

                    readline.close();
                });
            });
        });
    });
});