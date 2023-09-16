import { TextObject } from './types/textObject.ts';

export class PredefinedMessages {
  public static Intro: TextObject = {
    text: `> INITIALIZING DEEPDIVEDATABASE...
> LOADING PROFILE DATA...
> 
> WELCOME TO DEEPDIVEDATABASE
> 
> [SYSTEM]: Greetings, User.
> 
> You've accessed the terminal of DeepDiveDev, the realm of a seasoned full-stack developer. Here, you'll uncover the projects, skills, and tales of a developer who dives deep into the abyss of code to retrieve digital treasures.
> 
> [SYSTEM]: Choose an option to proceed:
> 
> 1. About DeepDiveDev
> 2. Portfolio & Projects
> 3. Skills & Expertise
> 4. Contact & Connect
>
`,
    type: true,
  };

  public static About: TextObject = {
    text: `> [SYSTEM]: Retrieving DeepDiveDev's profile...
>
> DeepDiveDev, known in the real world as Kristijan Ribarić, is a 23-year-old full-stack developer hailing from the historic city of Zagreb, Croatia. His journey into the abyss of code began with a passionate affair with React. As he delved deeper, his expertise expanded, embracing a myriad of technologies that now define the digital landscape.
>
> DeepDiveDev's mantra: Dive deep, explore uncharted depths, emerge with unparalleled solutions. This philosophy is evident in every line of code he crafts.
>
> [SYSTEM]: Dive in further for more insights.
`,
    type: true,
  };

  public static Portfolio: TextObject = {
    text: `> [SYSTEM]: Accessing DeepDiveDev's project database...
>
> DeepDiveDev's portfolio: A testament to dedication and expertise. From intricate web applications to robust backend solutions, a blend of creativity and technical prowess awaits.
>
> [SYSTEM]: Options:
> 2.1 - Explore Portfolio Page
> 2.2 - Dive into GitHub Repositories
>
> Enter choice:
`,
    type: true,
  };

  public static Skills: TextObject = {
    text: `> [SYSTEM]: Compiling list of DeepDiveDev's skills...
>
> DeepDiveDev's expertise:
>   - React
>   - Angular
>   - Blazor
>   - .NET
>   - Next.js
>   - SQL Databases (MySQL, SQL Server)
>   - TypeScript
>
> DeepDiveDev's belief: Continuous learning. With every project, boundaries are pushed, ensuring innovative and effective solutions.
>
> [SYSTEM]: End of list.
`,
    type: true,
  };

  public static Contact: TextObject = {
    text: `> [SYSTEM]: Establishing connection protocols...
>
> Connect with DeepDiveDev:
Whether for collaboration, advice, or tech chat, he's just a click away.
>
> [SYSTEM]: Options:
> 4.1 - Connect on LinkedIn
> 4.2 - Explore GitHub further
>
> Enter choice:
`,
    type: true,
  };

  public static Test: TextObject = {
    text: `> Hello World!`,
    type: true,
  };

  public static PortifolioExternal: TextObject = {
    text: `> [SYSTEM]: Attempting to access DeepDiveDev's Portfolio Page...
>
> [SYSTEM]: Error! The Portfolio Page is currently under construction. DeepDiveDev is diligently working to craft an immersive experience to showcase projects. We appreciate your understanding and patience.
>
> [SYSTEM]: Please select another option or type 'help' for assistance.
`,
    type: true,
  };
  public static FailedLinkedInRedirect: TextObject = {
    text: `> [SYSTEM]: It seems the pop-up was blocked. Please copy the link manually or disable your pop-up blocker: https://www.linkedin.com/in/kristijan-ribaric
    `,
    type: true,
  };

  public static FailedGithubRedirect: TextObject = {
    text: `> [SYSTEM]: It seems the pop-up was blocked. Please copy the link manually or disable your pop-up blocker: https://github.com/kristijanribaric
    `,
    type: true,
  };

  public static SuccessfulRedirect: TextObject = {
    text: `> [SYSTEM]: Redirect successful. Returning to terminal...
>
> Enter next choice:
`,
    type: true,
  };

  public static HelpIntro: TextObject = {
    text: `> [SYSTEM]: Displaying available commands...
>
> 1. about - Display information about DeepDiveDev.
> 2. portfolio - Navigate to the portfolio & projects page.
> 3. skills - List DeepDiveDev's skills & expertise.
> 4. contact - Connect with DeepDiveDev on LinkedIn and GitHub.
> 5. exit - Close the terminal session.
>
> [SYSTEM]: Enter the desired command or number to proceed.
`,
    type: true,
  };

  public static Unknown: TextObject = {
    text: `> [SYSTEM ERROR]: Command not recognized.
> [SYSTEM]: Please enter a valid command or type 'help' for a list of available commands.
`,
    type: true,
  };
}
