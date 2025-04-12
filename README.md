# Moments Event Ticket Booking App

Moments is an event ticket booking application with a Spring Boot backend and a React frontend.

## Backend

The backend uses Maven and MySQL. Configure credentials through environment variables or an ignored local configuration file; do not commit real credentials.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/moments_db
spring.datasource.username=<local-database-username>
spring.datasource.password=<local-database-password>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## Mail

Configure SMTP credentials locally and never commit app passwords.

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=<local-mail-username>
spring.mail.password=<local-mail-app-password>
```

## Payments

Configure PayPal sandbox credentials locally and never commit client identifiers or secrets.

```properties
paypal.mode=sandbox
paypal.client.id=<local-paypal-client-id>
paypal.client.secret=<local-paypal-client-secret>
```

## Image Storage

Configure Imgur credentials locally and never commit client identifiers or secrets.

```properties
imgur.client-id=<local-imgur-client-id>
imgur.client-secret=<local-imgur-client-secret>
```

## Frontend

```bash
cd moments_frontend
npm install
npm run dev
```

## Backend

```bash
cd moments_app
./mvnw spring-boot:run
```
