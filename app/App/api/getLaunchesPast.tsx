import { gql } from '@apollo/client';


export const GET_LAUNCHES_PAST = gql`
query GetLaunchesPast($order: String, $sort: String, $offset: Int, $limit: Int, $find: LaunchFind) {
    launchesPast(
      order: $order
      sort: $sort
      offset: $offset
      limit: $limit
      find: $find
    ) {
      mission_name
      launch_date_utc
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket_type
      }
      links {
        article_link
        video_link
      }
      launch_year
    }
  }
`;