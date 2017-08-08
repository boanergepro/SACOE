CREATE VIEW vista_datos_personas as 
SELECT 
	personas.id AS personas_id,
	personas.nombre,
	personas.apellido,
	personas.sexo,
	personas.nacionalidad,
	personas.ocupacion,
	personas.ciudad,
	personas.telefono,
	personas.correo,
	personas.direccion,
	personas.fecha_nacimiento,
	personas.fecha_registro,
	personas.heredad_id,
	personas.estado_personas

 ,

	fase_ganar.id AS registro_persona_id,
	fase_ganar.persona_id,
	fase_ganar.fecha_contactado,
	fase_ganar.lugar_contacto,
	fase_ganar.invitado_por,
	fase_ganar.fecha_visitar,
	fase_ganar.celula_insertar,
	fase_ganar.peticion_oracion,
	fase_ganar.estado_fase_ganar
,
	heredades.id AS heredades_id,
	heredades.nombre AS nombre_heredad,
	heredades.codigo
,
	date_part('year', age(fecha_nacimiento)) AS edad FROM personas
	
INNER JOIN fase_ganar ON personas.id = fase_ganar.persona_id
INNER JOIN heredades ON heredades.id = personas.heredad_id


SELECT * FROM vista_datos_personas