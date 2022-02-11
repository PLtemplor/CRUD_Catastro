CREATE TABLE IF NOT EXISTS predio(
id SERIAL PRIMARY KEY,
numeroPredial INTEGER NOT NULL,
avaluo VARCHAR(200),
nombre VARCHAR(200),
departamento VARCHAR(200),
munucipio Varchar(200),
created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks(title, description) VALUES ('task1', 'description1');