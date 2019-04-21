/**
 * Created by Lucas OMS on 22/10/2018.
 */

export class Emotes {
    /**
     * First element is the emote text, second is the link of the img to display
     * @type {MapConstructor<string, string>}
     */
    static all: Map<string, string> = new Map(
        [
            [':)', 'assets/emotes/smile.png'],
            [':D', 'assets/emotes/big_smile.png'],
            //Association logos
            ['bda_logo', 'assets/emotes/bda_logo.png'],
            ['bdc_logo', 'assets/emotes/bdc_logo.png'],
            ['bde_logo', 'assets/emotes/bde_logo.png'],
            ['bdhe_logo', 'assets/emotes/bdhe_logo.png'],
            ['bds_logo', 'assets/emotes/bds_logo.png'],
            ['pnc_logo', 'assets/emotes/pnc_logo.png'],
            ['brei_logo', 'assets/emotes/brei_logo.png'],
            //Mascots
            ['bdc_coddy', 'assets/emotes/bdc_coddy.png']
        ]
    );
}
