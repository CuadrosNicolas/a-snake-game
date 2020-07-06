import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {levelRouter} from './levelRoute';
/**
 * App initializer
 * @param {Express.Application} app
 */
export default function(app: any) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/levels', levelRouter);
  app.use((req: any, res: any)=>{
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render('404', {url: req.url});
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({error: 'Not found'});
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });
};
