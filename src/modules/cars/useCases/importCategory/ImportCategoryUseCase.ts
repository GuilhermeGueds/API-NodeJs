import fs from "fs";
import { parse } from "csv-parse"
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";


interface IImportCategory{
    name: string;
    description: string;
}

class ImportCategorieUseCase {
    constructor( private categoriesRepository: CategoriesRepository){}

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
       
       categories.map( await(category => {
            const{ name, description} = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if(!existCategory) {
                this.categoriesRepository.create({
                   name,
                   description 
                });
            }
       }));
    }
}


export { ImportCategorieUseCase };