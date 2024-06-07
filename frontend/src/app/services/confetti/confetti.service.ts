import { Injectable } from "@angular/core";
import * as confettiLib from 'canvas-confetti';

const confetti = confettiLib.default;

@Injectable({
    providedIn:"root",
})

export class ConfettiService{
    
    celebrate(){
        const duration = 30000;

        confetti({
            particleCount:1500,
            spread:180,
            origin:{y:0.6},
            colors: ['#FF4500', '#008080', '#FFD700'],
        });

        setTimeout(() => confetti.reset(), duration);
    }
}

