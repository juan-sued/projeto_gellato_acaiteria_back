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
}
```
      
      
      
      
      
