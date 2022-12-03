# CAMPEONATO
##### This is an exercise for Clien Web Programming in Software Ingenieriing at UTAD
##### Note this will be in Spanish
Diseñar con Bootstrap y React una Single Page tal que:


1) Iniciar proyecto react: npx create-react-app campeonato

2) En public/index.html hacer link a bootstrap

3) Descargar datos de participantes desde https://jsonplaceholder.typicode.com/users con axios (para instalarlo: npm i axios)

4) Mostrar la lista de participantes en pantalla desde los datos descargados, cada participante tendrá un botón que extenderá los detalles del mismo (usad collapse de Bootstrap).

5) Crear un botón para sortear enfrentamientos de manera aleatoria, almacenarlo en una variable de estado tipo [ {pista, jugador1, jugador2, resultado}, ... ] y mostrarlo en una tabla de bootstrap (haz uso de un componente hijo para cada enfrentamiento y pásale la variable de estado anterior como prop.

6) Crear un botón para obtener los resultados de los enfrentamientos de manera aleatoria, actualizando la variable de estado, en concreto, el campo "resultado".

7) Crea un carrousel de Bootstrap para visualizar los resultados.