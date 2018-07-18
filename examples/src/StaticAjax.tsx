
const StaticAlbumsAsyncResolver =
  AsyncResolver<AlbumsResponse | ErrorResponse>();

const staticAsyncFetch =
  () =>
    fetch('https://itunes.apple.com/search?term=bossa&entity=album&limit=3')
      .then(res => res.json())
      .catch(err => ({ error: err.toString() }));

export const StaticAlbums: React.StatelessComponent<AsyncArgs> = ({ query }) => (
  <StaticAlbumsAsyncResolver subject={staticAsyncFetch}>
    {(props: AlbumsResponse & ErrorResponse) => (
      <div>
        {props.error || !props.results ? (
          <p>{props.error}</p>
        ) : (
          <ul>
            {props.results.map(itemRenderer)}
          </ul>
        )}
      </div>
    )}
  </StaticAlbumsAsyncResolver>
);
