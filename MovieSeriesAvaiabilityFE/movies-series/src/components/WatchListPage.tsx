import { Container, ListGroup } from "react-bootstrap";
import { WatchListItem } from "../App"

interface Props {
  watchlist: WatchListItem[];
  

}

const WatchlistPage: React.FC<Props> = ({ watchlist }) => {
  return (
    <Container className="mt-5">
      <h1>Watchlist</h1>
      <ListGroup>
        {watchlist.map((item) => (
          <ListGroup.Item key={item.id}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.term}</a>
            <button className="btn btn-danger float-end">Remove</button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default WatchlistPage;