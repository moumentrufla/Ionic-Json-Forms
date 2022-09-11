import { NavParams } from 'ionic-angular';
import { AbstractDetailPage } from '../AbstractDetailPage';
export declare class DetailPage extends AbstractDetailPage {
    navParams: NavParams;
    item: any;
    isSplit: boolean;
    constructor(navParams: NavParams);
    goBack(): void;
}
