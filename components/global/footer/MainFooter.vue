<template>
  <footer :class="$style.footer">
    <p>
      &copy; {{ new Date().getFullYear() }} Maria Pinar. All rights reserved.
      <a target="_blank" href="https://mapins/cookie-policy" rel="noopener">
        Cookie Policy
      </a>
    </p>
    <p>
      Designed and built by me, data provided by
      <a target="_blank" href="/api" rel="noopener">Me</a>.
    </p>

    <ul class="nolist">
      <li>
        <a
          href="https://twitter.com/mapins"
          target="_blank"
          aria-label="Link to Twitter account"
          rel="noopener"
        >
          <SvgTwitter />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/mapins"
          target="_blank"
          aria-label="Link to GitHub account"
          rel="noopener"
        >
          <SvgGitHub />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/maria-pinar-pindado-88272a2b4/"
          target="_blank"
          aria-label="Link to LinkedIn account"
          rel="noopener"
        >
          <SvgLinkedin />
        </a>
      </li>
      <li>
        <a
          href="mailto:mariocha82004@gmail.com"
          aria-label="Link to Email"
          rel="noopener"
        >
          <SvgGmail />
        </a>
      </li>
    </ul>
  </footer>
</template>

<style lang="scss" module>
.footer {
  bottom: 0;
  padding: var(--s-padding-lateral);
  color: var(--c-grey-medium);
  background-color: var(--c-graphite);
  @include responsive() {
    padding: 3rem var(--s-padding-lateral-mobile);
  }
  p {
    margin: 0.3rem 0;
  }
  a {
    text-decoration: underline;
  }
  ul {
    display: flex;
    margin: 2rem 0 0 -0.5rem;
    a {
      @include flex();
      width: 4.4rem;
      height: 4.4rem;
      svg {
        transition: all 0.3s ease-in-out;
      }
      &:hover,
      &:focus {
        svg {
          fill: var(--c-white);
        }
      }
    }
  }
}
</style>
