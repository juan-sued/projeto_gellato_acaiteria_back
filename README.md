# projeto_gellato_acaiteria_back

Back-end for Gellato Açaiteria.

## About

Gellato açaiteria é uma loja virtual de açaí

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure file using the `.env.example` 

```bash
npm run migration
```

6. Run the back-end in a development environment:

```bash
npm run dev
```




# ==== ROUTES ====


## ->  AuthRoutes

 - POST ⇒ /sign-up

Requisição 
    
      http://localhost:4000/sign-up
      
  Body 
    
  
 ```
 "userData" = {
  "name": "Joãoa",
  "email": "joao7@driven.com.br",
  "password": "drivendasd",
  "confirmPassword": "drivendasd"
}```
      
Response
 
    - 201 ⇒ CREATED
    
    - Errors: 
        - 422 - dados inválidos ⇒  message: error_unprocessable_entity
        - 409 - usuário ja cadastrado ⇒  message: conflict
        - 404 - usuário não incontrado ⇒ message: usuário inexistente
        - 500 - erro interno do servidor
        
        
==============================================================================================


# POST /sign-in
      
 Descrição
   
    - login do usuário
    
Requisição
    
    html
    **http://localhost:4000/sign-in**
   
    
Body
    
    "user" = {
    "email": "joaozin@gmail.com",
    "password": "batatinha123"
    }
  
    
Response

    - Status 200 ⇒ OK
    
  {
    "user":{
    	"id": 14,
      "name": "Joe",
    },
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."
     }
  
    
    Errors
    
        - 422 - dados inválidos ⇒  message: error_unprocessable_entity
        - 404 - usuário não incontrado ⇒ message: usuário inexistente
        - 500 - erro interno do servidor
      
      
      
      
==============================================================================================================


# GET /users :autenticada

- ***Descrição***
    - Retorna uma lista com alguns dados de todos os usuários
    - Ao passar uma queryParams **users?name=”ronald”** devem ser retornada uma lista com os usuários filtrados.
    - Ao passar um “id” no params, é retornado um objeto com informações detalhadas de cada usuário
- **Header**
    
    ```json
    "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."
     }
    ```
    
- ***Requisição para a lista geral de usuários***
    
    ```html
    **http://localhost:4000/users**
    ```
    
- ***Requisição para a lista de usuários filtrados por* character**
    
    ```html
    **http://localhost:4000/users?name="<nome-do-user>"**
    ```
    
- ***Requisição para a lista de usuários filtrados por* character**
    
    ```html
    **http://localhost:4000/users/<id-do-user>**
    ```
    
- ***Response básico***
    
    ```json
    "users": [
    {
    		"id": 11
    	  "name": "Juan Sued Oliveira de Souza",
    		"phone": "21123456789",
    
    **},**
    {
    		"id": 5
    	  "name": "Ronaldinho Gaúcho",
    		"phone": "null",
    **}
    ],"**administrators**":[**
    {
    		"id": 1
    	  "name": "Alessandra Meireles",
    		"phone": "21123456789",
    **}]**
    ```
    
    - **Errors**
        - 401 - token inválido ⇒  message: token
        - 404 - usuário não incontrado ⇒ message: usuário inexistente
        - 500 - erro interno do servidor
    
- ***Response detalhado***
    
    ```json
    "user": {
      "user": {
        "id": 2,
        "name": "Joana",
        "email": "joana2430@driven.com.br",
        "phone": null,
        "cpf": null,
        "createdAt": "2022-11-13T18:22:56.864Z",
        "updatedAt": "2022-11-13T18:22:56.864Z",
        "isAdministrator": false
      },
      "addresses": []
    }
    ```
    
    - **Errors**
        - 401 - token inválido ⇒  message: token
        - 404 - usuário não incontrado ⇒ message: usuário inexistente
        - 500 - erro interno do servidor




=============================================================================================================




# - **PATCH /users** :autenticada
    
    
    - ***Descrição***
        - Atualiza os dados do usuário
        
    - ***Requisição***
        
        ```html
        **http://localhost:4000/users**
        ```
        
        - **Header**
            
            ```json
            "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."
             }
            ```
            
        - **Body**
            
            ```json
            "user": 
            {
            		"newPhone": "21123456789",
            		"newPassword": "senhasecreta123",
            **}**
            ```
            
        
    - ***Response***
        - 200 ⇒ OK
        - **Errors**
            - 401 - token inválido ⇒  message: token
            - 404 - usuário não incontrado ⇒ message: usuário inexistente
            - 500 - erro interno do servidor
    
# - **DELETE /users** :autenticada
    
    
    - ***Descrição***
        - Deleta os dados do usuário
        
    - ***Requisição***
        
        ```html
        **http://localhost:4000/users**
        ```
        
        - **Header**
            
            ```json
            "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."
             }
            ```
            
        
    - ***Response***
        - 200 ⇒ OK
        - **Errors**
            - 401 - token inválido ⇒  message: token
            - 404 - usuário não incontrado ⇒ message: usuário inexistente
            - 500 - erro interno do servidor









