import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-page',
  template: `
    <div>
    	<p>Hey! Welcome :)
    		<br />I'm
    		<span>Michael Alavedra</span>
    		<br/>Front-End Developer
    	</p>
    </div>`,
  styles: [`
    div {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: 100vh;
        justify-content: center;
        align-items: center;
        padding: 0 4em;
    }
    p {
        font-size: 4em;
        line-height: 1.4em;
        color: var(--white-100);
    }
    span {
        color: var(--primary-normal);
    }
    @media only screen and (max-width: 595px) {
        div {
            width: 100%;
            padding: 0;
        }
        p {
            font-size: 2.5em;
        }
    }`]
})
export class OverviewPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
