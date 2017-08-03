CREATE VIEW vista_datos_completos as SELECT personas.*, date_part('year', age(fecha_nacimiento)) AS edad FROM personas


select * from vista_datos_completos