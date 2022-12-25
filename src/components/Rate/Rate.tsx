import { StarHalfIcon, StartEmptyIcon, StartIcon } from '~/components/Icons';

interface RateProps {
    className?: string;
    average: number;
}

function Rate({ className, average }: RateProps) {
    const integer = Math.floor(average);
    const decimal = +(average - integer).toFixed(1);
    return (
        <div className={className}>
            {Array.from(Array(integer).keys()).map((index) => (
                <StartIcon key={index} width={14} height={14} className={'fill-[#fea569]'} />
            ))}
            {5 - integer >= 1 ? (
                decimal >= 0.5 ? (
                    <StarHalfIcon width={14} height={14} className={'fill-[#fea569]'} />
                ) : (
                    <StartEmptyIcon width={14} height={14} className={'fill-[#aeb4be]'} />
                )
            ) : null}
            {/* 5 - integer - 1 || (1 la phan thap phan) */}
            {4 - integer >= 0
                ? Array.from(Array(4 - integer).keys()).map((index) => (
                      <StartEmptyIcon key={index} width={14} height={14} className={'fill-[#aeb4be]'} />
                  ))
                : null}
        </div>
    );
}

export default Rate;
