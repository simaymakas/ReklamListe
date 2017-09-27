#import "AdsManager.h"
#import <AMRSDK/AMRSDK.h>


#import "React/RCTViewManager.h"

@interface AdsManager: RCTViewManager <AMRBannerDelegate>{
  AMRBanner *mpuBanner;
  UIView *myView;
}
@end

@implementation AdsManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  mpuBanner = [AMRBanner bannerForZoneId:@"1b65e016-5b26-4ba0-aff5-b500a96d5157"];
  mpuBanner.delegate = self;
  mpuBanner.bannerWidth = 320;
  
  myView = [[UIView alloc] init];
  [mpuBanner loadBanner];
  return myView;
}

- (void)didReceiveBanner:(AMRBanner *)banner {
  //[_container addSubview:banner.bannerView];
  
  [myView addSubview:banner.bannerView];

}

- (void)didFailToReceiveBanner:(AMRBanner *)banner error:(AMRError *)error {
  NSLog(@"%@", error.errorDescription);
  
}

@end

















