CREATE VIEW vista_datos_completos as 
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
	personas.heredad,
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
	date_part('year', age(fecha_nacimiento)) AS edad FROM personas
	
INNER JOIN fase_ganar ON personas.id = fase_ganar.persona_id


SELECT * FROM vista_datos_completos