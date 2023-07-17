import React from 'react';
import { useTripExplorerQueries } from '../../common/api/datadashboard';
import type { Station } from '../../common/types/stations';
import type { AggregateAPIOptions, SingleDayAPIOptions } from '../../common/types/api';
import { WidgetDiv } from '../../common/components/widgets/WidgetDiv';
import { WidgetTitle } from '../dashboard/WidgetTitle';
import { getLocationDetails } from '../../common/utils/stations';
import type { Line } from '../../common/types/lines';
import { TravelTimesAggregateWrapper } from '../traveltimes/TravelTimesAggregateWrapper';
import { TravelTimesSingleWrapper } from '../traveltimes/TravelTimesSingleWrapper';
import { HeadwaysSingleWrapper } from '../headways/HeadwaysSingleWrapper';
import { HeadwaysAggregateWrapper } from '../headways/HeadwaysAggregateWrapper';

interface BusTripGraphsProps {
  fromStation: Station;
  toStation: Station;
  parameters: AggregateAPIOptions | SingleDayAPIOptions; // TODO
  aggregate: boolean;
  enabled: boolean;
  line: Line | undefined;
}

export const BusTripGraphs: React.FC<BusTripGraphsProps> = ({
  fromStation,
  toStation,
  parameters,
  aggregate,
  enabled,
  line,
}) => {
  const { traveltimes, headways } = useTripExplorerQueries(
    'bus',
    parameters,
    // @ts-expect-error The overloading doesn't seem to handle this const
    aggregate,
    enabled
  );
  const location = getLocationDetails(fromStation, toStation);

  return (
    <div className="flex flex-col gap-4">
      {aggregate ? (
        <>
          <WidgetDiv>
            <WidgetTitle title="Travel times" location={location} line={line} both />
            <TravelTimesAggregateWrapper
              query={traveltimes}
              fromStation={fromStation}
              toStation={toStation}
            />
          </WidgetDiv>
          <WidgetDiv>
            <WidgetTitle
              title="Headways"
              subtitle="Time between buses"
              location={location}
              line={line}
            />
            <HeadwaysAggregateWrapper
              query={headways}
              toStation={toStation}
              fromStation={fromStation}
            />
          </WidgetDiv>
        </>
      ) : (
        <>
          <WidgetDiv>
            <WidgetTitle title="Travel times" location={location} line={line} both />
            <TravelTimesSingleWrapper
              query={traveltimes}
              toStation={toStation}
              fromStation={fromStation}
            />
          </WidgetDiv>
          <WidgetDiv>
            <WidgetTitle
              title="Headways"
              subtitle="Time between buses"
              location={location}
              line={line}
            />
            <HeadwaysSingleWrapper
              query={headways}
              toStation={toStation}
              fromStation={fromStation}
            />
          </WidgetDiv>
        </>
      )}
    </div>
  );
};
