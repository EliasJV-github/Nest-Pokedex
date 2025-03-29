import { Injectable } from '@nestjs/common';
import { PokeResponce } from './interfaces/poke-responce.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly HttpAdapter: AxiosAdapter,
  ) {}

  async executeSeed(){
    await this.pokemonModel.deleteMany({});

    const data = await this.HttpAdapter.get<PokeResponce>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const insertPromise:{name:string, no:number}[] = [];

    data.results.forEach(({name, url})=>{

      const segments = url.split('/');
      const no:number = +segments[segments.length -2];

      //const pokemon = await this.pokemonModel.create({name, no });
      insertPromise.push({name,no});
    })
    await this.pokemonModel.insertMany(insertPromise);
  }

}



