import fs from "fs";
import { parse } from "csv-parse"
import { CategoriesRepository } from "../../infra/typeorm/repositories/CategoriesRepository";
import { inject, injectable } from "tsyringe";


interface IImportCategory{
    name: string;
    description: string;
}
@injectable()
class ImportCategorieUseCase {
    constructor( 
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository){}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolver, reject) => {
            const stream = fs.createReadStream(file.path);
        const categories: IImportCategory[] = [];

        const parseFile = parse();

        stream.pipe(parseFile);

        parseFile.on("data", async(line) =>{
            const [ name, description ] = line;
            categories.push({
                name,
                description
            });
       })
       .on("end",() => {
           fs.promises.unlink(file.path);
           resolver(categories);
       })
       .on("error", (err) =>{
           reject(err);
       })
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
       const categories = await this.loadCategories(file);
       
       categories.map( async (category) => {
            const{ name, description} = category;

            const existCategory = await this.categoriesRepository.findByName(name);

            if(!existCategory) {
                await this.categoriesRepository.create({
                   name,
                   description 
                });
            }
       });
    }
}


export { ImportCategorieUseCase };