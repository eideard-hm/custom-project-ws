import { type RouteComponentProps } from '@reach/router';

type Props = { element: JSX.Element } & RouteComponentProps;

export function Route(props: Props) {
  return props.element;
}
