# justDev Bot
JustDev Bot est un bot de modération et de niveaux

## milestone:

Modération:
- [ ] warn(WIP)
- [x] mute(timeout)
- [x] unmute
- [x] user-info
- [x] serveur-info
- [x] kick
- [x] ban
- [x] clear

misc:
- [x] role-menu
- [x] ticket

## contribuer:

### démarrer le bot
```bash
npm run start
```
### variable d'environment(.env)
TOKEN:token du bot discord\
APPLICATIONID:application id([ici](https://discord.com/developers/applications/${applicationId}/information) => "application id")\
CLIENTID:client id du bot([ici](https://discord.com/developers/applications/${applicationId}/oauth2/general) => "client id")\
GUILDID:id de la guild de test(for mode DEV)\
RULEROLE:id du role à donner lors de la pressions du bouton "accepter les règles"\
DEVROLE:id du role developpement(select-role)\
COMMUROLE:id du role communauter(select-role)\
GAMINGROLE:id du role gaming(select-role)\
PARENTID:id de la catégorie pour la création de ticket\
MODE:PROD | DEV(mode du bot)\
