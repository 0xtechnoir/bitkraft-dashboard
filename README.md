Useful Resources: 
https://github.com/verumlotus/Inter-Bridge-Visualizer

Tutorials:
https://www.youtube.com/watch?v=MFuwkrseXVE&ab_channel=Academind

Data Sources:
https://data.nasdaq.com/data/USTREASURY/YIELD-treasury-yield-curve-rates
Koyfin (Macro)
https://www.theblockcrypto.com/data/crypto-markets/spot (Crypto)

Inspiration:
https://app.intotheblock.com/coin/ETH/deep-dive?group=all&chart=all

Documentation: 
https://pixinvent.com/demo/materialize-mui-react-nextjs-admin-template/documentation/guide/overview/getting-started.html
https://mui.com/material-ui/customization/theming/
https://nextjs.org/docs/getting-started

## Notes on Prisma

Prisma is an Object Relational Mapper (ORM) to streamline interaction with data in this application
https://www.prisma.io/docs/

It contains a schema which can be found:
prisma -> schema.prisma

When any changes are made to the database you will need to run:
```
yarn prisma db pull
```
This will update the schema in the project. Then run:
```
yarn prisma generate
```
This will ensure the prisma client is updated with any schema changes.