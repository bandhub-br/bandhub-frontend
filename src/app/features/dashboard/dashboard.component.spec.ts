import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the feed content container', () => {
    const mainContainer = fixture.debugElement.query(By.css('main.feed-content'));
    expect(mainContainer).toBeTruthy();
  });

  it('should render all initial mock posts', () => {
    const posts = fixture.debugElement.queryAll(By.css('.post-card'));
    expect(posts.length).toBe(3);
    
    // Check if the author name of the first post is rendered correctly
    const firstAuthor = fixture.debugElement.query(By.css('.post-card .author-name')).nativeElement;
    expect(firstAuthor.textContent).toContain('The Midnight Echo');
  });
  
  it('should have a create post box', () => {
    const postBox = fixture.debugElement.query(By.css('.create-post-box'));
    const input = fixture.debugElement.query(By.css('.post-input'));
    const button = fixture.debugElement.query(By.css('.create-post-box button'));
    
    expect(postBox).toBeTruthy();
    expect(input).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Postar');
  });

  it('should display trending topics in the right sidebar', () => {
    const trendingItems = fixture.debugElement.queryAll(By.css('.trending-list li span'));
    expect(trendingItems.length).toBe(3);
    expect(trendingItems[0].nativeElement.textContent).toContain('#RockNacional');
  });
});
