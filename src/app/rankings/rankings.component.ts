import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { PlayerFromAPI } from '../models/player.model';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

export interface ranking
{
  player_name: string;
  current_rank: number;
  player_country: string;
  player_points: number;
  prev_rank: number;
  flag_url?: string;
}

@Component({
  styleUrls: ['rankings.component.css'],
  templateUrl: 'rankings.component.html',
  
})
  
export class RankingsComponent implements OnInit {
  //NO SIRVEN
  //@ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  //@ViewChildren(MatPaginator) paginator3: MatPaginator;

  //@ViewChildren(MatPaginator) paginator4: MatPaginator;
 // @ViewChild(MatPaginator) paginator2: MatPaginator;

  api: any;
  playersATP: Array<PlayerFromAPI> = [];
  playersWTA: Array<PlayerFromAPI> = [];
  currentFlag = '';
 /* FUNCIONAL */
  displayedColumns: string[] = [ 'current_rank','player_country','player_name', 'player_points', 'prev_rank'];
  sourceatp = new MatTableDataSource<ranking>(ranking_atp);
  displayedColumns2: string[] = ['current_rank','player_country','player_name', 'player_points', 'prev_rank'];
  sourcewta = new MatTableDataSource<ranking>(ranking_wta);

  //FILTRADO DE JUGADORES
  applyFilter(filterValue: string)
  {
    this.sourceatp.filter = filterValue.trim().toLowerCase();
    this.sourcewta.filter = filterValue.trim().toLowerCase();
  }
//SI SIRVEN Problema con WTA
  //@ViewChild(MatPaginator) paginatorA: MatPaginator;
  //@ViewChild(MatPaginator) paginatorW: MatPaginator;
  
  //Prueba
  @ViewChild('paginatorA') paginatorA: MatPaginator;
  @ViewChild('paginatorW') paginatorW: MatPaginator;

  flagURL = "https://assets.thebasetrip.com/api/v2/countries/flags/";
  constructor (private atpRankingService: PlayerService) { }

  printPlayers () {
    
    console.log(this.playersATP);
    console.log(this.playersWTA);
    this.playersATP.forEach(element => {
      element.flag_url = this.flagURL.concat(element.player_country.toLowerCase().concat('.png'));;
    });
    this.currentFlag = this.playersATP[1].flag_url;
  }

  getRanking () {
    this.atpRankingService.getAtpRanking().subscribe(
      data => {
        this.api = data;
        this.api.records.forEach(player => {
          this.playersATP.push(player.fields);
        });
      }
    );
    this.atpRankingService.getWtaRanking().subscribe(
      data => {
        this.api = data;
        this.api.records.forEach(player => {
          this.playersWTA.push(player.fields);
        });
      }
    );
  }

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.sourceatp.paginator ? this.sourceatp.paginator = this.paginatorA : null;
          break;
        case 1:
          !this.sourcewta.paginator ? this.sourceatp.paginator = this.paginatorW : null;
      }
    });
  }
  ngAfterViewInit() {
    this.sourceatp.paginator = this.paginatorA;
    this.sourcewta.paginator = this.paginatorW;
  }
  ngOnInit() {
    //this.sourceatp.paginator = this.paginatorA;
    //this.sourcewta.paginator = this.paginatorW;
       //this.getRanking();
    //Prueba
    /*this.playersATP=[{
      "current_rank":1,
      "player_country":"Serbia",
      "player_name":"Novak Djokovic",
      "player_points":11070,
      "prev_rank":1
    }]*/
  }

}





















  //Para las banderas
  //https://www.thebasetrip.com/en/documentation/v3/basic
  //https://assets.thebasetrip.com/api/v2/countries/flags/france.png
  //https://assets.thebasetrip.com/api/v2/countries/flags/france.svg
  //Hay banderas que no se muestran por el nombre como la de USA (United States)
  //que en la api deberia escribirse como united-states, se puede arreglar haciendo una tubería.

/*
import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { PlayerFromAPI } from '../models/player.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  styleUrls: ['rankings.component.css'],
  templateUrl: 'rankings.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class RankingsComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['position', 'player', 'points'];
  expandedElement: ranking1 | null;

  api: any;
  playersATP: Array<PlayerFromAPI> = [];
  playersWTA: Array<PlayerFromAPI> = [];
  currentFlag = '';

  //Para las banderas
  //https://www.thebasetrip.com/en/documentation/v3/basic
  //https://assets.thebasetrip.com/api/v2/countries/flags/france.png
  //https://assets.thebasetrip.com/api/v2/countries/flags/france.svg
  //Hay banderas que no se muestran por el nombre como la de USA (United States)
  //que en la api deberia escribirse como united-states, se puede arreglar haciendo una tubería.

  flagURL = "https://assets.thebasetrip.com/api/v2/countries/flags/";
  constructor (private atpRankingService: PlayerService) { }

  printPlayers () {
    console.log(this.playersATP);
    console.log(this.playersWTA);
    this.playersATP.forEach(element => {
      element.flag_url = this.flagURL.concat(element.player_country.toLowerCase().concat('.png'));;
    });
    this.currentFlag = this.playersATP[1].flag_url;
  }

  getRanking () {
    this.atpRankingService.getAtpRanking().subscribe(
      data => {
        this.api = data;
        this.api.records.forEach(player => {
          this.playersATP.push(player.fields);
        });
      }
    );
    this.atpRankingService.getWtaRanking().subscribe(
      data => {
        this.api = data;
        this.api.records.forEach(player => {
          this.playersWTA.push(player.fields);
        });
      }
    );
  }
  ngOnInit () {
    this.getRanking();
  }

}


export interface ranking1 {
  position: number;
  player: string;
  points: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: ranking1[] = [
  {
    position: 1,
    player: 'Novak Đoković',
    points: 11070,
    symbol: 'SRB',
    description: `Es un tenista profesional serbio ganador de 15 torneos de Grand Slam cifra que lo ubica en el 3er lugar de máximos ganadores de Grand Slam en todos los tiempos solo por detrás de ,Roger Federer con 20 y Rafael Nadal con 17. Además cuenta con 5 ATP World Tour Finals, y actualmente ocupa el número 1 en el Ranking ATP de tenistas individuales.`
  }, {
    position: 2,
    player: 'Rafael Nadal',
    points: 8725,
    symbol: 'ESP',
    description: `Es un tenista profesional español que ocupa actualmente la segunda posición del ranking ATP.
    Está considerado uno de los mejores tenistas de la historia y el mejor de todos los tiempos en pistas de tierra batida.7​8​9​10​ Hasta la fecha ha sido campeón de 17 torneos de Grand Slam, lo que le coloca como el segundo jugador profesional con más títulos "grandes" en la historia del tenis, tras el suizo Roger Federer (20 títulos). `
  }, {
    position: 3,
    player: 'Alexander Zverev',
    points: 6040,
    symbol: 'GER',
    description: `Es un tenista alemán de ascendencia rusa. Su ranking más alto a nivel individual ha sido el puesto n.º 3, conseguido el 6 de noviembre de 2017. Al terminar la temporada 2015 en el puesto 81º del mundo con solo 18 años, fue premiado por la ATP como el tenista más joven en el Top 100.`
  }, {

    position: 4,
    player: 'Roger Federer',
    points: 5590,
    symbol: 'SUI',
    description: `Es un tenista suizo12​, actualmente ocupa el cuarto lugar en la Clasificación de la ATP. Federer ha ganado 20 títulos individuales en torneos Grand Slam, el mayor número de toda la historia en tenis masculino y ha mantenido el puesto número 1 en el ranking de la ATP por un tiempo récord de 310 semanas, 237 consecutivas.`
  }, {

    position: 5,
    player: '	Dominic Thiem',
    points: 4765,
    symbol: 'AUT',
    description: `Es un jugador de tenis austriaco, que actualmente ocupa la cuarta posición del Ranking ATP. Su mejor posición en el ranking fue n.º 4 conseguida el 6 de octubre de 2017, mientras que en dobles alcanzó el puesto n.º 86 el 3 de octubre de 2016.`
  }, {

    position: 6,
    player: 'Kei Nishikori',
    points: 4200,
    symbol: 'JPN',
    description: `Es un jugador de tenis japonés. Actualmente se ubica en el puesto 7 del ranking ATP. Es el número 1 de Japón, y el mejor tenista asiático de la historia.
    En 2006 ganó su primer título profesional (Future) México F18 en la ciudad de Mazatlán, con solo 16 años. En 2007 se clasificó para su primer evento de ATP en el Torneo de Los Ángeles.`
  }, {

    position: 7,
    player: 'Kevin Anderson',
    points: 4115,
    symbol: 'RSA',
    description: `Es un jugador de tenis sudafricano, que actualmente ocupa el sexto lugar del ranking ATP, consiguió su mejor ranking el 16 de julio de 2018 al situarse en el puesto 5° tras ser finalista en Wimbledon 2018.`
  }, {

    position: 8,
    player: '	Stefanos Tsitsipas',
    points: 3240,
    symbol: 'GRE',
    description: `Es un tenista profesional griego que compite como profesional desde 2016. Tiene como mejor ranking individual en la ATP el 10º, que alcanzó el 4 de marzo de 2019. En la modalidad de dobles alcanzó el puesto número 315 del mundo el 24 de julio de 2017. Ha ganado un total de cinco títulos ITF Futures en individual, así como seis títulos de dobles.`
  }, {

    position: 9,
    player: '	Juan Martín Del Potro',
    points: 3225,
    symbol: 'ARG',
    description: `Es un tenista argentino que compite como profesional desde 2005. Actualmente ocupa el noveno lugar del Ranking ATP.
    Comenzó a practicar tenis a los siete años.3​En agosto de 2008, se convirtió en el primer jugador en la historia de la ATP en ganar cuatro torneos consecutivos en condición de debutante.`
  }, {

    position: 10,
    player: 'John Isner',
    points: 3085,
    symbol: 'USA',
    description: ` Es un tenista profesional estadounidense, actualmente ocupa la undécima posición del Ranking ATP.
    Consiguió su mejor ranking en la ATP el 16 de julio de 2018, cuando apareció como número 8 del mundo. Tras ganar el Masters de Miami, igualó dicha posición el 2 de abril de 2018. Destaca por su poderoso servicio y altura de 2,07 metros. `
  },
];
*/






const ranking_atp: ranking[] = [
  {
    "current_rank":1,
    "player_country":"Serbia",
    "player_name":"Novak Djokovic",
    "player_points":12115,
    "prev_rank":1
  },
  {
    "current_rank":2,
  "player_country":"Spain",
  "player_name":"Rafael Nadal",
  "player_points":7945,
  "prev_rank":2 },
  {
    "current_rank":3,
    "player_country":"Switzerland",
    "player_name":"Roger Federer",
    "player_points":5770,
    "prev_rank":4
    },
    {
      "current_rank":4,
      "player_country":"Austria",
      "player_name":"Dominic Thiem",
      "player_points":4845,
      "prev_rank":5
    },
    {
      "current_rank":5,
      "player_country":"Germany",
      "player_name":"Alexander Zverev",
      "player_points":4745,
      "prev_rank":3
    },
    {
    "current_rank":6,
    "player_country":"Japan",
    "player_name":"Kei Nishikori",
    "player_points":4200,
    "prev_rank":6
    },
   {
    "current_rank":7,
    "player_country":"South Africa",
    "player_name":"Kevin Anderson",
    "player_points":4115,
    "prev_rank":7
    },
    {
    "current_rank":8,
    "player_country":"Greece",
    "player_name":"Stefanos Tsitsipas",
    "player_points":3240,
    "prev_rank":8
    },
    {
    "current_rank":9,
    "player_country":"Argentina",
    "player_name":"Juan Martin del Potro",
    "player_points":3225,
    "prev_rank":9
    },
    {
    "current_rank":10,
    "player_country":"Usa",
    "player_name":"John Isner",
    "player_points":3085,
    "prev_rank":10
    },
    {
    "current_rank":11,
    "player_country":"Croatia",
    "player_name":"Marin Cilic",
    "player_points":3015,
    "prev_rank":11
    },
    {
    "current_rank":12,
    "player_country":"Russia",
    "player_name":"Karen Khachanov",
    "player_points":2810,
    "prev_rank":12
    },
   {
    "current_rank":13,
    "player_country":"Croatia",
    "player_name":"Borna Coric",
    "player_points":2345,
    "prev_rank":13
    },
   {
    "current_rank":14,
    "player_country":"Russia",
    "player_name":"Daniil Medvedev",
    "player_points":2295,
    "prev_rank":14
    },
    {
    "current_rank":15,
    "player_country":"Canada",
    "player_name":"Milos Raonic",
    "player_points":2140,
    "prev_rank":15
    },
   {
    "current_rank":16,
    "player_country":"Italy",
    "player_name":"Marco Cecchinato",
    "player_points":2021,
    "prev_rank":16
    },
    {
    "current_rank":17,
    "player_country":"Georgia",
    "player_name":"Nikoloz Basilashvili",
    "player_points":1930,
    "prev_rank":17
    },
   {
    "current_rank":18,
    "player_country":"Italy",
    "player_name":"Fabio Fognini",
    "player_points":1885,
    "prev_rank":18
    },
    {
    "current_rank":19,
    "player_country":"France",
    "player_name":"Gael Monfils",
    "player_points":1875,
    "prev_rank":19
    },
   {
    "current_rank":20,
    "player_country":"Canada",
    "player_name":"Denis Shapovalov",
    "player_points":1820,
    "prev_rank":20
    },
    {
    "current_rank":21,
    "player_country":"Belgium",
    "player_name":"David Goffin",
    "player_points":1765,
    "prev_rank":21
    },
   {
    "current_rank":22,
    "player_country":"Spain",
    "player_name":"Roberto Bautista Agut",
    "player_points":1680,
    "prev_rank":23
    },
    {
    "current_rank":23,
    "player_country":"Great Britain",
    "player_name":"Kyle Edmund",
    "player_points":1575,
    "prev_rank":22
    },
    {
    "current_rank":24,
    "player_country":"Argentina",
    "player_name":"Diego Schwartzman",
    "player_points":1485,
    "prev_rank":24
    },
    {
    "current_rank":25,
    "player_country":"Australia",
    "player_name":"Alex De Minaur",
    "player_points":1439,
    "prev_rank":25
    },
   {
    "current_rank":26,
    "player_country":"France",
    "player_name":"Gilles Simon",
    "player_points":1385,
    "prev_rank":27
    },
   {
    "current_rank":27,
    "player_country":"Spain",
    "player_name":"Pablo Carreno Busta",
    "player_points":1300,
    "prev_rank":28
    },
    {
    "current_rank":28,
    "player_country":"Bulgaria",
    "player_name":"Grigor Dimitrov",
    "player_points":1300,
    "prev_rank":29
    },
   {
    "current_rank":29,
    "player_country":"United States",
    "player_name":"Frances Tiafoe",
    "player_points":1290,
    "prev_rank":30
   },

  {
    "current_rank":30,
    "player_country":"France",
    "player_name":"Richard Gasquet",
    "player_points":1285,
    "prev_rank":26
    },
   {
    "current_rank":31,
    "player_country":"France",
    "player_name":"Lucas Pouille",
    "player_points":1275,
    "prev_rank":31
    },
    {
    "current_rank":32,
    "player_country":"Serbia",
    "player_name":"Laslo Djere",
    "player_points":1246,
    "prev_rank":32
    },
    {
    "current_rank":33,
    "player_country":"Canada",
    "player_name":"Felix Auger-Aliassime",
    "player_points":1245,
    "prev_rank":33
    },
    {
    "current_rank":34,
    "player_country":"Australia",
    "player_name":"Nick Kyrgios",
    "player_points":1215,
    "prev_rank":35
    },
    {
    "current_rank":35,
    "player_country":"Argentina",
    "player_name":"Guido Pella",
    "player_points":1205,
    "prev_rank":34
    },
   {
    "current_rank":36,
    "player_country":"Switzerland",
    "player_name":"Stan Wawrinka",
    "player_points":1185,
    "prev_rank":36
    },
    {
    "current_rank":37,
    "player_country":"Hungary",
    "player_name":"Marton Fucsovics",
    "player_points":1180,
    "prev_rank":37
    },
   {
    "current_rank":38,
    "player_country":"Spain",
    "player_name":"Fernando Verdasco",
    "player_points":1155,
    "prev_rank":38
    },
    {
    "current_rank":39,
    "player_country":"Australia",
    "player_name":"John Millman",
    "player_points":1095,
    "prev_rank":40
    },
    {
    "current_rank":40,
    "player_country":"Germany",
    "player_name":"Philipp Kohlschreiber",
    "player_points":1090,
    "prev_rank":41
    },
    {
    "current_rank":41,
    "player_country":"France",
    "player_name":"Jeremy Chardy",
    "player_points":1055,
    "prev_rank":42
    },
   {
    "current_rank":42,
    "player_country":"Kazakhstan",
    "player_name":"Mikhail Kukushkin",
    "player_points":1025,
    "prev_rank":44
    },
   {
    "current_rank":43,
    "player_country":"France",
    "player_name":"Benoit Paire",
    "player_points":993,
    "prev_rank":69
    },
   {
    "current_rank":44,
    "player_country":"Germany",
    "player_name":"Jan-Lennard Struff",
    "player_points":990,
    "prev_rank":45
    },
    {
    "current_rank":45,
    "player_country":"Moldova",
    "player_name":"Radu Albot",
    "player_points":977,
    "prev_rank":46
    },
    {
      "current_rank":46,
      "player_country":"Italy",
      "player_name":"Andreas Seppi",
      "player_points":970,
      "prev_rank":47
      },
      {
      "current_rank":47,
      "player_country":"Chile",
      "player_name":"Christian Garin",
      "player_points":970,
      "prev_rank":73
      },
      {
      "current_rank":48,
      "player_country":"Serbia",
      "player_name":"Dusan Lajovic",
      "player_points":950,
      "prev_rank":48
      },
     {
      "current_rank":49,
      "player_country":"France",
      "player_name":"Pierre-Hugues Herbert",
      "player_points":948,
      "prev_rank":50
      },
     {
      "current_rank":50,
      "player_country":"Slovakia",
      "player_name":"Martin Klizan",
      "player_points":940,
      "prev_rank":49
      },
];   

const ranking_wta: ranking[] = [
 {
    "current_rank":1,
    "player_country":"Japan",
    "player_name":"Naomi Osaka",
    "player_points":5967,
    "prev_rank":1
    },
   {
    "current_rank":2,
    "player_country":"Romania",
    "player_name":"Simona Halep",
    "player_points":5782,
    "prev_rank":2
    },
    {
    "current_rank":3,
    "player_country":"Czech Republic",
    "player_name":"Petra Kvitova",
    "player_points":5645,
    "prev_rank":3
    },
   {
    "current_rank":4,
    "player_country":"Czech Republic",
    "player_name":"Karolina Pliskova",
    "player_points":5580,
    "prev_rank":4
    },
   {
    "current_rank":5,
    "player_country":"Germany",
    "player_name":"Angelique Kerber",
    "player_points":5220,
    "prev_rank":5
    },
  {
    "current_rank":6,
    "player_country":"Ukraine",
    "player_name":"Elina Svitolina",
    "player_points":5020,
    "prev_rank":6
    },
   {
    "current_rank":7,
    "player_country":"Netherlands",
    "player_name":"Kiki Bertens",
    "player_points":4640,
    "prev_rank":7
    },
   {
    "current_rank":8,
    "player_country":"Usa",
    "player_name":"Sloane Stephens",
    "player_points":4386,
    "prev_rank":8
    },
  {
    "current_rank":9,
    "player_country":"Australia",
    "player_name":"Ashleigh Barty",
    "player_points":4275,
    "prev_rank":9
    },
  {
    "current_rank":10,
    "player_country":"Belarus",
    "player_name":"Aryna Sabalenka",
    "player_points":3520,
    "prev_rank":10
    },
   {
    "current_rank":11,
    "player_country":"Usa",
    "player_name":"Serena Williams",
    "player_points":3461,
    "prev_rank":11
    },
    {
    "current_rank":12,
    "player_country":"Denmark",
    "player_name":"Caroline Wozniacki",
    "player_points":3421,
    "prev_rank":12
    },
    {
    "current_rank":13,
    "player_country":"Latvia",
    "player_name":"Anastasija Sevastova",
    "player_points":3145,
    "prev_rank":13
    },
   {
    "current_rank":14,
    "player_country":"Usa",
    "player_name":"Madison Keys",
    "player_points":3011,
    "prev_rank":14
    },
    {
    "current_rank":15,
    "player_country":"Estonia",
    "player_name":"Anett Kontaveit",
    "player_points":2845,
    "prev_rank":15
    },
    {
    "current_rank":16,
    "player_country":"China",
    "player_name":"Qiang Wang",
    "player_points":2812,
    "prev_rank":16
    },
  {
    "current_rank":17,
    "player_country":"Germany",
    "player_name":"Julia Goerges",
    "player_points":2630,
    "prev_rank":18
    },
   {
    "current_rank":18,
    "player_country":"Belgium",
    "player_name":"Elise Mertens",
    "player_points":2580,
    "prev_rank":17
    },
    {
    "current_rank":19,
    "player_country":"Spain",
    "player_name":"Garbine Muguruza",
    "player_points":2525,
    "prev_rank":19
    },
    {
    "current_rank":20,
    "player_country":"Switzerland",
    "player_name":"Belinda Bencic",
    "player_points":2515,
    "prev_rank":20
    },
    {
      "current_rank":21,
      "player_country":"France",
      "player_name":"Caroline Garcia",
      "player_points":2460,
      "prev_rank":21
      },
      {
      "current_rank":22,
      "player_country":"Russia",
      "player_name":"Daria Kasatkina",
      "player_points":2355,
      "prev_rank":22
      },
      {
      "current_rank":23,
      "player_country":"Canada",
      "player_name":"Bianca Andreescu",
      "player_points":1979,
      "prev_rank":23
      },
      {
      "current_rank":24,
      "player_country":"Chinese Taipei",
      "player_name":"Su-Wei Hsieh",
      "player_points":1960,
      "prev_rank":24
      },
     {
      "current_rank":25,
      "player_country":"Croatia",
      "player_name":"Donna Vekic",
      "player_points":1875,
      "prev_rank":25
      },
     {
      "current_rank":26,
      "player_country":"Ukraine",
      "player_name":"Lesia Tsurenko",
      "player_points":1767,
      "prev_rank":26
      },
    {
      "current_rank":27,
      "player_country":"Spain",
      "player_name":"Carla Suarez Navarro",
      "player_points":1718,
      "prev_rank":27
      },
     {
      "current_rank":28,
      "player_country":"Russia",
      "player_name":"Maria Sharapova",
      "player_points":1706,
      "prev_rank":28
      },
     {
      "current_rank":29,
      "player_country":"Latvia",
      "player_name":"Jelena Ostapenko",
      "player_points":1665,
      "prev_rank":29
      },
     {
      "current_rank":30,
      "player_country":"Romania",
      "player_name":"Mihaela Buzarnescu",
      "player_points":1650,
      "prev_rank":31
      },
      {
        "current_rank":31,
        "player_country":"Italy",
        "player_name":"Camila Giorgi",
        "player_points":1604,
        "prev_rank":30
        },
       {
        "current_rank":32,
        "player_country":"United States",
        "player_name":"Danielle Collins",
        "player_points":1536,
        "prev_rank":32
        },
        {
        "current_rank":33,
        "player_country":"Slovakia",
        "player_name":"Dominika Cibulkova",
        "player_points":1512,
        "prev_rank":33
        },
       {
        "current_rank":34,
        "player_country":"Russia",
        "player_name":"Anastasia Pavlyuchenkova",
        "player_points":1510,
        "prev_rank":34
        },
       {
        "current_rank":35,
        "player_country":"Belarus",
        "player_name":"Aliaksandra Sasnovich",
        "player_points":1495,
        "prev_rank":35
        },
       {
        "current_rank":36,
        "player_country":"United States",
        "player_name":"Sofia Kenin",
        "player_points":1458,
        "prev_rank":36
        },
        {
        "current_rank":37,
        "player_country":"Ukraine",
        "player_name":"Dayana Yastremska",
        "player_points":1400,
        "prev_rank":37
        },
        {
        "current_rank":38,
        "player_country":"Kazakhstan",
        "player_name":"Yulia Putintseva",
        "player_points":1291,
        "prev_rank":38
        },
        {
        "current_rank":39,
        "player_country":"Australia",
        "player_name":"Ajla Tomljanovic",
        "player_points":1253,
        "prev_rank":39
        },
        {
        "current_rank":40,
        "player_country":"Croatia",
        "player_name":"Petra Martic",
        "player_points":1245,
        "prev_rank":40
        },
        {
          "current_rank":41,
          "player_country":"Czech Republic",
          "player_name":"Katerina Siniakova",
          "player_points":1237,
          "prev_rank":41
          },
         {
          "current_rank":42,
          "player_country":"China",
          "player_name":"Shuai Zhang",
          "player_points":1220,
          "prev_rank":42
          },
         {
          "current_rank":43,
          "player_country":"China",
          "player_name":"Saisai Zheng",
          "player_points":1205,
          "prev_rank":43
          },
        {
          "current_rank":44,
          "player_country":"Greece",
          "player_name":"Maria Sakkari",
          "player_points":1197,
          "prev_rank":44
          },
         {
          "current_rank":45,
          "player_country":"Slovakia",
          "player_name":"Viktoria Kuzmova",
          "player_points":1195,
          "prev_rank":46
          },
         {
          "current_rank":46,
          "player_country":"Great Britain",
          "player_name":"Johanna Konta",
          "player_points":1180,
          "prev_rank":47
          },
         {
          "current_rank":47,
          "player_country":"Czech Republic",
          "player_name":"Marketa Vondrousova",
          "player_points":1167,
          "prev_rank":45
          },
         {
          "current_rank":48,
          "player_country":"Czech Republic",
          "player_name":"Barbora Strycova",
          "player_points":1166,
          "prev_rank":48
          },
         {
          "current_rank":49,
          "player_country":"Usa",
          "player_name":"Venus Williams",
          "player_points":1115,
          "prev_rank":49
          },
         {
          "current_rank":50,
          "player_country":"Usa",
          "player_name":"Alison Riske",
          "player_points":1103,
          "prev_rank":50
          },
];

