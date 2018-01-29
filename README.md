# SACOE

### Sistema Administrativo de la Coordinacón de Evangelismo

##### Esta sistema nace con la finalidad de automatizar el poceso de cargado, manipulación y prensentación de la data de las personas que han sido ganadao por el equipo de la iglesia Casa de Adoración Cristiana C.A.C.

### Para el desarrollador


###### Comandos que se deben ejecutar en la terminal, estando ubicado en el directorio del proyecto.

```bash
git clone https://github.com/boanergepro/SACOE.git
```

```bash
cd SACOE
```

```bash
npm install
```

```bash
node_modules/.bin/sequelize db:migrate --url 'postgres://postgres:parangaturimicuaro@localhost:5432/sacoeDB'
```

```bash
node_modules/.bin/sequelize db:seed:all --url 'postgres://postgres:parangaturimicuaro@localhost:5432/sacoeDB'
```

```bash
npm start
```