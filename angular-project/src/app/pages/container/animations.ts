import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes

} from '@angular/animations';


const slideTo = function (direction: string) {
    const optional = { optional: true };

    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: '3.5rem',
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        query(
            ':enter', [
            style({
                [direction]: '-100%'
            })
        ]),
        group([
            query(':leave', [
                animate('1s ease', style({ [direction]: '-100%' }))
            ], optional),
            query(':enter', [
                animate('1s ease', style({ [direction]: '0%' }))
            ], optional)
        ])
    ];
}


export const slider = trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left')),
    transition('* => isRight', slideTo('right')),
    transition('isLeft => *', slideTo('right')),
    transition('isRight => *', slideTo('left')),
    transition('isLeft => isRight', slideTo('right')),
    transition('isRight => isLeft', slideTo('left'))
])
