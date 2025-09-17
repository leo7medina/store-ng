import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

export interface PageMetaTags {
  title: string;
  description: string;
  image: string;
  url: string;
}

const defaultMetaTags: PageMetaTags = {
  title: 'Store NG',
  description: 'Store NG',
  image: 'https://store-ng.vercel.app/assets/images/logo.png',
  url: 'https://store-ng.vercel.app',
};

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  updateMetaTags(metaData: Partial<PageMetaTags>) {
    const updatedMetaTags = { ...defaultMetaTags, metaData };
    const tags = this.generateMetaTags(updatedMetaTags);
    tags.forEach((tag) => this.metaService.updateTag(tag));
    this.titleService.setTitle(updatedMetaTags.title);
  }

  private generateMetaTags(metaData: PageMetaTags): MetaDefinition[] {
    return [
      { name: 'title', content: metaData.title },
      { name: 'description', content: metaData.description },
      { property: 'og:title', content: metaData.title },
      { property: 'og:description', content: metaData.description },
      { property: 'og:image', content: metaData.image },
      { property: 'og:url', content: metaData.url },
    ];
  }
}
