function eliminaacentos(cadena){
      for(var i=0; i<cadena.length;i++){
            if(cadena[i]=='á' || cadena[i]=='ä')cadena[i]='a';
            if(cadena[i]=='Á' || cadena[i]=='Ä')cadena[i]='A';
            if(cadena[i]=='é' || cadena[i]=='ë')cadena[i]='e';
      }
}


function select_id(id){
      return document.getElementById(id); //permite obtener una etiqueta por id, dentro del documento html
}

function style(id){
      return select_id(id).style;
}

function readText(ruta_local){
      //función para leer texto de un documento de manera asíncrona

      var text0=null;
      var xmlhttp=new XMLHttpRequest();
      xmlhttp.open("GET", ruta_local, false);
      xmlhttp.send();
      if(xmlhttp.status==200){
            texto=xmlhttp.responseText;
      }

      return texto;

}


//aquí empiezan las funciones para obtener los cuestionarios

function cargaBasePreguntas (nombrearchivo){ //devuelve un arreglo con las preguntas de toda la base de preguntas
      let base_preguntas=readText(nombrearchivo); //guardo en un objeto la base de preguntas completa
      let preguntas_interpretadas=JSON.parse(base_preguntas); 

      return preguntas_interpretadas;//arreglo con preguntas, es 0-indexado y ya formateado
}


function verpreguntasconsola(nombrearchivo){
      console.log(cargaBasePreguntas (nombrearchivo)); //muestra en la consola todo el archivo JSON
}


function escogerPregunta(x,nombrearchivo){ //escoge la x-ésima preungta de alguna unidad
      
      let preguntas_interpretadas=cargaBasePreguntas (nombrearchivo); //arreglo con preguntas, es 0-indexado
      let question=preguntas_interpretadas[x]; 

      return question;
}


function escribePreguntas(quizz){ 
      for(var i=0;i< quizz.length;i++){
            
            let question=quizz[i]; 
            //console.log(question);
            x=i+1; //1-indexado
                  
            select_id("desc_preg"+x.toString()).innerHTML=("<h2>"+x+". "+question.pregunta+"</h2>");
                        
            select_id("label_a_preg"+x.toString()).innerHTML+=(" "+question.op_a);
            
            select_id("label_b_preg"+x.toString()).innerHTML+=(" "+question.op_b);
            
            select_id("label_c_preg"+x.toString()).innerHTML+=(" "+question.op_c);
            
            select_id("label_d_preg"+x.toString()).innerHTML+=(" "+question.op_d);                  

            select_id("label_e_preg"+x.toString()).innerHTML+=(" "+question.op_e);                  
            
      }            
}

function verificarRadios(numPreguntasAleatorias){

      let nombre_pregunta, opcionesPregunta;
      let preguntasContestadas = 0;

      for(let i = 0; i<numPreguntasAleatorias; i++){
       
            nombre_pregunta = 'resp_preg' + (i+1); //Obtenemos el nombre
            opcionesPregunta = document.getElementsByName(nombre_pregunta); //Guardamos las cuatro respuestas de la pregunta

            for(let j = 0; j < opcionesPregunta.length; j++)  //Con este for vemos cual es la que está seleccionada
                  if(opcionesPregunta[j].checked )
                        ++preguntasContestadas;      
      }
      return numPreguntasAleatorias === preguntasContestadas;
}


function obtenerRespuestasUsuario(numPreguntasAleatorias){


      let nombre_pregunta, respuestaUsuario, opcionesPregunta;
      let respuestas_usuario = []; //Arreglo para guardar las respuestas del usuario
    
      for(let i = 0; i<numPreguntasAleatorias; i++){
       
            nombre_pregunta = 'resp_preg' + (i+1); //Obtenemos el nombre
            opcionesPregunta = document.getElementsByName(nombre_pregunta); //Guardamos las cuatro respuestas de la pregunta

            for(let j = 0; j < opcionesPregunta.length; j++){  //Con este for vemos cual es la que está seleccionada
              if(opcionesPregunta[j].checked )
                 respuestaUsuario = opcionesPregunta[j].value;
            }

            respuestas_usuario.push(respuestaUsuario); //Si la respuesta está seleccionada, la agregamos al arreglo
            
      }

      return respuestas_usuario;

}

function sumaponderada(respuestas, cuestionario){
      //a partir de las respuestas obtiene dos arreglos con 
      
      var letra;
      var porcentcategoria=0;
      var pesores=0;
      var suma=0;
      var actual=0;
      for(var i=0; i<cuestionario.length ;i++){
            
            letra=respuestas[i];
            porcentcategoria=parseFloat(cuestionario[i].porcentaje_categoria);
            
            if(letra=="a"){
                  pesores=parseFloat(cuestionario[i].peso_op_a);
            }
            if(letra=="b"){
                  pesores=parseFloat(cuestionario[i].peso_op_b);
            }
            if(letra=="c"){
                  pesores=parseFloat(cuestionario[i].peso_op_c);
            }
            if(letra=="d"){
                  pesores=parseFloat(cuestionario[i].peso_op_d);
            }
            if(letra=="e"){
                  pesores=parseFloat(cuestionario[i].peso_op_e);
            }

            actual=(pesores)*(1/10)*porcentcategoria;
            console.log(letra+ " "+ actual+ " " + pesores +" " + porcentcategoria+ " ");                        
            suma+=actual
      }
      return suma;
}


