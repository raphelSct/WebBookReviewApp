# SAE W42



## Initialiser l'API

Au besoin, supprimer le fichier tsconfig.json
Executer ces commandes dans l'ordre pour pouvoir lancer correctement l'API: 

```
npm init -y

```
Créer un fichier .env à la source, et écrire ces deux lignes : 

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="RANDOM_TOKEN_SECRET"
```

```
npm install -D typescript ts-node ts-node-dev @types/node
npx tsc --init
npm install express@next
npm install -D @types/express
npm run dev
```

## Initialiser la partie front-end

```
npm install
```

