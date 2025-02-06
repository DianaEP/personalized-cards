import React from 'react';
import BalletSvg from '../assets/svg/ballet.svg';
import BirthdaySvg from '../assets/svg/birthday.svg';
import CoffeeSvg from '../assets/svg/coffee.svg';
import MeditatingSvg from '../assets/svg/meditating.svg';
import PlantSvg from '../assets/svg/plant.svg';
import WeddingSvg from '../assets/svg/wedding.svg';
import { SvgProps } from 'react-native-svg';

export interface AssetSvg {
    id: string;
    svg: React.FC<SvgProps> // Type for React component SVG

}

export const ASSETS_SVG: AssetSvg[] = [
    { id: '1', svg: BalletSvg },
    { id: '2', svg: BirthdaySvg },
    { id: '3', svg: CoffeeSvg }, 
    { id: '4', svg: MeditatingSvg },
    { id: '5', svg: PlantSvg },
    { id: '6', svg: WeddingSvg },
];