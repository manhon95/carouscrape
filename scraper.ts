import cheerio from "cheerio";

type Item = {
    name: string;
    price: string;
    URL: string;
}

export class CarouScraper {
    constructor(){}
    
    private items:Item[] = undefined
    private readonly baseURL:string = "https://www.carousell.com.hk/"

    async scrape():Promise<void> {
        const res = await fetch("https://www.carousell.com.hk/categories/5350/?addRecent=false&canChangeKeyword=false&includeSuggestions=false&price_start=1000&sc=0a0208301a0408d2886f220f0a0b69706164206d696e69203678012a160a057072696365220b0a09090000000000408f4078012a170a0b636f6c6c656374696f6e7312060a043533353078012a160a057072696365220b0a09090000000000408f4078013204080378013a02180742060801100118004a08200128014001480150005a020801&search=ipad%20mini%206&searchId=mqS3df&sort_by=3&t-search_query_source=ss_dropdown")
        const html = await res.text();
        const $:cheerio.Root = cheerio.load(html);
        
        const itemsSrc = $("div.D_pV.M_ls")
        if (itemsSrc != null) {
            this.items = [];
            itemsSrc.each((i: number, elem: cheerio.Element) => {
                this.items.push({
                    name:$(elem).find("p.D_oN.M_jt.D_oO.M_ju.D_oS.M_jy.D_oV.M_jA.D_oY.M_jE.D_pa.M_jG.D_oW.M_jB.D_pf").text(),
                    price:$(elem).find("p.D_oN.M_jt.D_oO.M_ju.D_oS.M_jy.D_oU.M_j_.D_oY.M_jE.D_pb.M_jH.D_pe").text(),
                    URL:this.baseURL + $(elem).find("a.D_pi.M_jT").attr('href')
                })
            })
        }
    }

    getItems() {
        return this.items
    }
}