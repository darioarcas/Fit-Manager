
import tortaDeAvena from "./img-recetas/Torta-de-avena.png";
import cremaDeAvena from "./img-recetas/Crema-de-avena.png";
import tostadaFrancesa from "./img-recetas/Tostada-Francesa.png";
import tostadoConHuevo from "./img-recetas/Tostado-con-Huevo.jpg";
import sandwichFit from "./img-recetas/Sanwich-Fit.jpg";
import tacosFit from "./img-recetas/Tacos-Fit.jpg";


export const suplementos = ["Citrato de Magnesio", "Citrato de Potasio", "Vitamina C", "Multivitaminico", "Omega 3", "Picolinato de Cromo", "Sal Marina", "Cafeina HDL", "Creatina", "Te verde"];

export const preguntasFrecuentes = [
    {
        pregunta:"¿Los alimentos se pesan crudos o cocidos?",
        respuesta:"Los alimentos de la dieta están pesados en crudo."

    }, 
    {
        pregunta:"¿Es necesario respetar el orden de comidas?",
        respuesta:"Si, el orden de comidas es impuesto por una preferencia general de eficiencia, de modo que podamos tener mas saciedady control del hambre en el dia."

    }, 
    {
        pregunta:"¿Que pasa si no puedo comer una comida en el dia?",
        respuesta:"Trate de juntar esa comida con la siguiente , lo importante es que al final del dia coma todo lo impuesto por la dieta."

    }, 
    {
        pregunta:"¿Que carnes usar en la dieta?",
        respuesta:"Cuando hablamos de carnes en la dieta es obligatorio el uso cortés magros sin grasa para etapas de definición, para etapas de volumen se puede tolerar  un pequeño margen de grasa en la carne. Las carnes pueden ser de vaca, cerdo, pescado y pollo. Pesar siempre sin el hueso."

    }, 
    {
        pregunta:"¿Cuanto y que verduras usar en las ensaladas?",
        respuesta:"El uso de verduras en etapas de volumen es completamente libre al igual que la cantidad, para etapas de definición se recomienda que predominen verduras de color verde como lechuga, brócoli, espárragos, coliflor, pepino, acelgas, espinaca, zapallo verde, repollo, etc. en cantidades de 1 o 2 taza por comida."

    }, 
    {
        pregunta:"¿Puedo condimentar mis comidas?",
        respuesta:"Si, puede usar cualquier tipo de especias  o condimentos como pimienta negra, sal, ajo, papikra, comino, etc y tambien los condimentos ya preprarados  como cubitos sopa, saborizantes de carnes, comidas, etc. Utilice los condimentos si es necesario para una mejor aderecia a la dieta."

    }, 
    {
        pregunta:"¿Puedo usar salsas para acompañar mis comidas?",
        respuesta:"Si, se puede usar pero con moderacion siempre y cuando sea salsas light o con pocas calorias como por ejemplo Mayonesa light o Salsa picante light. Una regla a la hora de usar salsas es de no comer mas de 1 cuchara sopera por salsa, la cualdebe contener menos de 20 calorias por cuchara. Si no esta seguro de su ingesta o el tipo de salsa comuniquese con nosotros y envienos una foto del producto con su valor nutricional para asesorarlo."

    }, 
    {
        pregunta:"¿Que aceite de oliva elegir?",
        respuesta:"Asegurese de comprar aceite envasado en botella de vidrio o metal pero nunca de plastico para asegurarse de su calidad y pureza."

    }, 
    {
        pregunta:"¿Cuanta agua tomar al dia?",
        respuesta:"Trata de tomar entre 2 a 3 lt de agua pura al dia y de 3 a 4 lt  en tiempo de calor o de mucha actividad."

    }

];

export const recetas = [
    {nombre:"Torta de avena", ingredientes:{uno:"Avena o harina arroz", dos:"Huevos (claras y/o yemas)", tres:"Edulcorante", cuatro:"Canela (opcional)", cinco:"Esencia de vainilla (opcional)", seis:"Frutos Rojos (opcional)", siete:"Ralladura limon (opcional) "}, preparacion:{uno:")En un recipiente batir los huevos hasta forma una espuma, luego agregar la avena o harina de arroz, edulcorante, esencia de vainilla (opcional), canela (opcional), ralladura de limón (opcional) y batir de 2 a 3 min aproximado hasta que este todo bien mesclado.", dos:"En una sartén antiadherente poner aceite en spray y volcar la mezcla, dejar cocinar a fuego lento de los dos lados y listo. Se recomida poner una tapa a la sartén para que no quede muy seco la torta de avena.", nota: "Se le puede agregar un puñado de frutos rojos y/o salsas 0kcal estilo Mrs. Taste a gusto."}, img: tortaDeAvena},
    {nombre:"Crema de avena", ingredientes:{uno:"Avena o harina arroz", dos:"Edulcorante", tres:"Canela (opcional)", cuatro:"Esencia de vainilla (opcional)", cinco:"Frutos Rojos (opcional)"}, preparacion:{uno:"En una olla con uno o 2 vasos de agua hervida aproximadamente cocinar la avena a fuego bajo, revolviéndola para que no se pegue hasta formar una especie de crema ni muy seca y ni muy liquida.", dos:"Agregar edulcorante, canela (opcional), frutos rojos (opcional) y listo ", nota: "Puede agregar la proteína en su crema de avena, pero debe dejar que este un poco más tibia y no tan caliente."}, img: cremaDeAvena},
    {nombre:"Tostada Francesa", ingredientes:{uno:"Pan de molde", dos:"Huevos (claras y/o yemas)", tres:"Edulcorante", cuatro:"Canela", cinco:"Esencia de vainilla", seis:"Frutos Rojos (opcional)"}, preparacion:{uno:"En un plato hondo poner las yemas y/o claras, edulcorante, canela, esencia de vainilla y mezclarlo bien con un tenedor (no batidora).", dos:"Remojar los panes en la mezcla de los dos lados y llevarlos a la sartén antiadherente previamente con aceite en espray y pre calentada. Dejar cocinar fuego medio a bajo los panes de cada lado aproximadamente 2 o 3 minutos o el tiempo que desee.", tres:"Luego agregar un puñado de frutos rojos opcional, pasta de maní y salsas cero calorías estilo Mr. taste opcional", nota: ""}, img: tostadaFrancesa},
    {nombre:"Tostado con Huevo", ingredientes:{uno:"Pan de molde", dos:"Huevos (claras y/o yemas)", tres:"Crema de leche"}, preparacion:{uno:"En una sarten sarten con aceite en spray poner los huevos con 1 cuchara de crema de leche, jamon (opcional) y revolver hasta que esten mezclado , luego tapar la  sarten y esperar que se cocine bien sin que se pierda la humedad.  Usar sal a gusto ", dos:"En otra sarten o tostadora poner los panes para que se doren y luego servir con los huevos.", nota: ""}, img: tostadoConHuevo},
    {nombre:"Sanwich Fit", ingredientes:{uno:"", dos:"", tres:"", cuatro:"", cinco:"", seis:"", siete:""}, preparacion:{uno:"", dos:"", nota: ""}, img: sandwichFit},
    {nombre:"Tacos Fit", ingredientes:{uno:"Carnes (pollo-vaca-cerdo)", dos:"Fajita", tres:"Sal", cuatro:"Pimienton en polvo", cinco:"Jugo de Limon", seis:"Ajo picado"}, preparacion:{uno:"En un bol poner pollo, sal, pimienta, jugo de limón, ajo picado y pimentón en polvo. Cocinar el pollo con un poquito de aceite entre 5 a 7 minutos y retirar.", dos:"En la misma sartén agregar cebollas y pimientos, cocinar 5 minutos hasta que estén crujientes. Agregar el pollo a la sartén nuevamente para mezclar sabores.", tres:"Calentar las tortillas hasta que estén calientes y flexibles. Sirve las fajitas de pollo y verduras en las tortillas calientes", nota: ""}, img: tacosFit},

];