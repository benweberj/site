import React, { useState } from 'react'

const Fragment: React.FC<{ d: string, fill: string, on: boolean }> = props => {
  // const [on, setOn] = useState(false)
  const { on } = props

  return <>
    <path {...props} style={{
      // opacity: on ? 1 : .1,
      transform: on ? `translate(${100 -Math.random()*200}px, ${100-Math.random()*200}px)` : undefined,
      transition: 'all .5s ease'
    }} />
  </>
}

const Taya: React.FC = () => {
  const [on, setOn] = useState(false)
  const fragProps = { on }


  return (<><button onClick={() => setOn(!on)}>fuck</button>
    <svg overflow='visible' width="854" height="884" viewBox="0 0 854 984" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Fragment {...fragProps} d="M213.5 873.5L241 849.5L257 875.5L232 915.5L213.5 873.5Z" fill="#FCC7A5"/>
      <Fragment {...fragProps} d="M271 924L232 915.5L257 875.5L277 908L304 965L271 924Z" fill="#DAAA8B"/>
      <Fragment {...fragProps} d="M194.5 926L213.5 873.5L232 915.5L194.5 926Z" fill="#F6BE9A"/>
      <Fragment {...fragProps} d="M271 924L194.5 984L232 915.5L271 924Z" fill="#E3AF8E"/>
      <Fragment {...fragProps} d="M194.5 984V926L232 915.5L194.5 984Z" fill="#DFA783"/>
      <Fragment {...fragProps} d="M282 984L271 924L304 965L304.5 984H282Z" fill="#D19B7D"/>
      <Fragment {...fragProps} d="M244.5 968L194.5 984H282L244.5 968Z" fill="#BD7F5B"/>
      <Fragment {...fragProps} d="M271 924L244.5 968L282 984L271 924Z" fill="#CD9271"/>
      <Fragment {...fragProps} d="M194.5 984L244.5 968L271 924L194.5 984Z" fill="#CD9271"/>
      <Fragment {...fragProps} d="M654 869.5L622 835.5L643.5 916L654 869.5Z" fill="#DDB69D"/>
      <Fragment {...fragProps} d="M679.5 928.5L654 869.5L643.5 916L676 984L679.5 928.5Z" fill="#DAAA8B"/>
      <Fragment {...fragProps} d="M566 984L593 958.5L609 984H566Z" fill="#B38060"/>
      <Fragment {...fragProps} d="M565.5 890.5L593 958.5L528.5 955L565.5 890.5Z" fill="#BE8A69"/>
      <Fragment {...fragProps} d="M566 984L593 958.5L528.5 955L520 984H566Z" fill="#B98E72"/>
      <Fragment {...fragProps} d="M643.5 916L600.5 858L588 846.5L592 830L605.5 827L622 835.5L643.5 916Z" fill="#CF9E7F"/>
      <Fragment {...fragProps} d="M593 958.5L643.5 916L676 984H609L593 958.5Z" fill="#D2A181"/>
      <Fragment {...fragProps} d="M643.5 916L565.5 890.5L600.5 858L643.5 916Z" fill="#D6A98D"/>
      <Fragment {...fragProps} d="M593 958.5L565.5 890.5L643.5 916L593 958.5Z" fill="#D19A77"/>
      <Fragment {...fragProps} d="M316.5 410L275.5 467.5L274 405L291.5 381.5L315 375L316.5 410Z" fill="#764735"/>
      <Fragment {...fragProps} d="M320 463L281 479.5L275.5 467.5L316.5 410L320 463Z" fill="#5E341F"/>
      <Fragment {...fragProps} d="M308 514L320 463L345.5 540L308 514Z" fill="#5E341F"/>
      <Fragment {...fragProps} d="M281 479.5L308 514L320 463L281 479.5Z" fill="#A46E59"/>
      <Fragment {...fragProps} d="M289 539L308 514L281 479.5L282 499.5L289 539Z" fill="#A46E59"/>
      <Fragment {...fragProps} d="M345.5 540L308 514L289 539L314.5 571L330.5 574.5L345.5 540Z" fill="#724434"/>
      <Fragment {...fragProps} d="M343.5 742L291.5 732L319.5 702.5L366.5 698L343.5 742Z" fill="#CD9271"/>
      <Fragment {...fragProps} d="M325.5 792L343.5 742L291.5 732L298.5 775L325.5 792Z" fill="#B17757"/>
      <Fragment {...fragProps} d="M312.5 805L325.5 792L298.5 775L297 780L312.5 805Z" fill="#8C5B3F"/>
      <Fragment {...fragProps} d="M349.5 771L343.5 742L366.5 698L377.5 739L349.5 771Z" fill="#B27E63"/>
      <Fragment {...fragProps} d="M383.5 810L349.5 771L377.5 739L402.5 771L399.5 812L383.5 810Z" fill="#6A3C31"/>
      <Fragment {...fragProps} d="M434.5 811L399.5 812L402.5 771L412 766.5L439 790L434.5 811Z" fill="#48281D"/>
      <Fragment {...fragProps} d="M381.5 807.5L325.5 792L343.5 742L349.5 771L381.5 807.5Z" fill="#8C5B3F"/>
      <Fragment {...fragProps} d="M319 798.5L325.5 792L381 807.5H375.5L341.5 803.5L319 798.5Z" fill="#653D2D"/>
      <Fragment {...fragProps} d="M273 688L249 601.5L274 607.5L306 611L273 688Z" fill="#F6BE9A"/>
      <Fragment {...fragProps} d="M306 611L328 664L273 688L306 611Z" fill="#D9A98B"/>
      <Fragment {...fragProps} d="M277 746L273 688L291.5 732L298.5 775L291.5 773L277 746Z" fill="#C6865E"/>
      <Fragment {...fragProps} d="M291.5 732L273 688L328 664L319.5 702.5L291.5 732Z" fill="#C59475"/>
      <Fragment {...fragProps} d="M349 632.5L328 664L306 611L329 613.5L351 612L349 632.5Z" fill="#EEB189"/>
      <Fragment {...fragProps} d="M366.5 698L319.5 702.5L328 663.5L349 633L366.5 698Z" fill="#CD9271"/>
      <Fragment {...fragProps} d="M576 751L573.5 793L510 804L509.5 784.5L576 751Z" fill="#8C5B3F"/>
      <Fragment {...fragProps} d="M304 965L277 908L348 891L304 965Z" fill="#1C1C1C"/>
      <Fragment {...fragProps} d="M304.5 984L304 965L348 891L343 984H304.5Z" fill="black"/>
      <Fragment {...fragProps} d="M461 973.5L429.5 871.5L348 891L461 973.5Z" fill="#1C1C1C"/>
      <Fragment {...fragProps} d="M343 984L348 891L461 973.5L343 984Z" fill="#0A0A0A"/>
      <Fragment {...fragProps} d="M534.5 844L461 973.5L488.5 807.5L534.5 844Z" fill="#090909"/>
      <Fragment {...fragProps} d="M488.5 807.5L461 973.5L429.5 871.5L488.5 807.5Z" fill="#181818"/>
      <Fragment {...fragProps} d="M464 984L461 973.5L528.5 955L520 984H464Z" fill="#121212"/>
      <Fragment {...fragProps} d="M464 984L461 973.5L343.5 984H464Z" fill="black"/>
      <Fragment {...fragProps} d="M565.5 890.5L528.5 955L534.5 844L565.5 890.5Z" fill="#0D0D0D"/>
      <Fragment {...fragProps} d="M461 973.5L528.5 955L534.5 844L461 973.5Z" fill="#121212"/>
      <Fragment {...fragProps} d="M600.5 858L565.5 890.5L534.5 844L600.5 858Z" fill="#060606"/>
      <Fragment {...fragProps} d="M598 832L600.5 858L534.5 844L488.5 807.5L600.5 819L598 832Z" fill="#0A0A0A"/>
      <Fragment {...fragProps} d="M600.5 819L573.5 791L530.5 798L488.5 807.5L600.5 819Z" fill="black"/>
      <Fragment {...fragProps} d="M277 908L241 849.5L429.5 871.5L277 908Z" fill="#0E0E0E"/>
      <Fragment {...fragProps} d="M244 831L249.5 825L331 860L268.5 787.5L244 831Z" fill="#1C1C1C"/>
      <Fragment {...fragProps} d="M241 849.5L331 860L248.5 820L244.5 830.5L241 849.5Z" fill="#080808"/>
      <Fragment {...fragProps} d="M341.5 803.5L268.5 787.5L331 860L341.5 803.5Z" fill="#1A1A1A"/>
      <Fragment {...fragProps} d="M375.5 807.5L331 860L341.5 803.5L375.5 807.5Z" fill="#0D0D0D"/>
      <Fragment {...fragProps} d="M429.5 871.5L331 860L375.5 807.5L429.5 871.5Z" fill="#090909"/>
      <Fragment {...fragProps} d="M375.5 807.5L429.5 871.5L488.5 807.5H375.5Z" fill="black"/>
      <Fragment {...fragProps} d="M636.5 814L623 799L644.5 771.5L653 819L636.5 814Z" fill="#281512"/>
      <Fragment {...fragProps} d="M133.5 549.5L122 513.5L192.5 467L230 501.5L133.5 549.5Z" fill="#764735"/>
      <Fragment {...fragProps} d="M248 381.5L275 310.5L194 353L248 381.5Z" fill="#EEB189"/>
      <Fragment {...fragProps} d="M149.5 385L194 353L213.5 403L174.5 399L149.5 385Z" fill="#D9A98B"/>
      <Fragment {...fragProps} d="M149.5 385L174.5 399L130 418.5L149.5 385Z" fill="#F6BE9A"/>
      <Fragment {...fragProps} d="M248 381.5L213.5 403L194 353L248 381.5Z" fill="#DDAF92"/>
      <Fragment {...fragProps} d="M259.5 408.5L248 381.5L265.5 335.5L266.5 374.5L259.5 408.5Z" fill="#A97655"/>
      <Fragment {...fragProps} d="M248 381.5L213.5 403L234 452L259.5 408.5L248 381.5Z" fill="#62372B"/>
      <Fragment {...fragProps} d="M177.5 441.5L213.5 403L174.5 399L177.5 441.5Z" fill="#B37E63"/>
      <Fragment {...fragProps} d="M213.5 403L234 452L177.5 441.5L213.5 403Z" fill="#653D2D"/>
      <Fragment {...fragProps} d="M177.5 441.5L122 513.5L192.5 467L177.5 441.5Z" fill="#B57E61"/>
      <Fragment {...fragProps} d="M192.5 467L177.5 441.5L234 452L192.5 467Z" fill="#6E4C35"/>
      <Fragment {...fragProps} d="M230 501.5L192.5 467L234 452L230 501.5Z" fill="#48281D"/>
      <Fragment {...fragProps} d="M259.5 408.5L234 452L230 501.5L240.5 521L259.5 459.5V408.5Z" fill="#6A3C31"/>
      <Fragment {...fragProps} d="M161 573L230 501.5L133.5 549.5L161 573Z" fill="#5E341F"/>
      <Fragment {...fragProps} d="M110 636L161 573L133.5 549.5L110 636Z" fill="#643827"/>
      <Fragment {...fragProps} d="M92 616L133.5 549.5L78.5 581.5L92 616Z" fill="#84503E"/>
      <Fragment {...fragProps} d="M122 513.5L78.5 581.5L133.5 549.5L122 513.5Z" fill="#A46E59"/>
      <Fragment {...fragProps} d="M0 656.5L92 616L133.5 549.5L110 636L0 656.5Z" fill="#724434"/>
      <Fragment {...fragProps} d="M0 656.5L78.5 581.5L92 616L0 656.5Z" fill="#824B3A"/>
      <Fragment {...fragProps} d="M0 617.5V656.5L78.5 581.5L75 502L0 617.5Z" fill="#C7856A"/>
      <Fragment {...fragProps} d="M108 454.5L75 502L78.5 581.5L122 513.5L177.5 441.5L108 454.5Z" fill="#CD9271"/>
      <Fragment {...fragProps} d="M130 418.5L108 454.5L177.5 441.5L174.5 399L130 418.5Z" fill="#E9AE88"/>
      <Fragment {...fragProps} d="M41.5 711.5L0 656.5L68 692.5L88 742.5L41.5 711.5Z" fill="#8E5536"/>
      <Fragment {...fragProps} d="M68 692.5L0 656.5L110 636L94 662L68 692.5Z" fill="#683E2A"/>
      <Fragment {...fragProps} d="M156.5 695.5L94 662L110 636L156.5 695.5Z" fill="#533523"/>
      <Fragment {...fragProps} d="M129 737L94 662L156.5 695.5L161 735L129 737Z" fill="#5D331F"/>
      <Fragment {...fragProps} d="M135.5 767L88 742.5L129 737L135.5 767Z" fill="#855136"/>
      <Fragment {...fragProps} d="M135.5 767L129 737L161 735L135.5 767Z" fill="#703D2D"/>
      <Fragment {...fragProps} d="M88 742.5L129 737L94 662L68 692.5L88 742.5Z" fill="#73442C"/>
      <Fragment {...fragProps} d="M166.5 786.5L154 774L160.5 765L181.5 762L166.5 786.5Z" fill="#614028"/>
      <Fragment {...fragProps} d="M181 749L160.5 765L181.5 762L199 769.5L204 753L181 726V749Z" fill="#56372C"/>
      <Fragment {...fragProps} d="M207.5 731.5L204 753L181 726L178 698L207.5 731.5Z" fill="#9E6048"/>
      <Fragment {...fragProps} d="M219.5 751L207.5 731.5L204 753L199 769.5L186 789L202.5 779.5L223.5 777.5L244 758L219.5 751Z" fill="#754337"/>
      <Fragment {...fragProps} d="M205 817.5L186 789L166.5 786.5L178.5 819L198.5 834L211.5 832.5L219 810L206.5 797L205 817.5Z" fill="#935042"/>
      <Fragment {...fragProps} d="M199 769.5L186 789L166.5 786.5L181.5 762L199 769.5Z" fill="#73453B"/>
      <Fragment {...fragProps} d="M207.5 789L206.5 797L219 810L224.5 800L215 785L207.5 789Z" fill="#895E5A"/>
      <Fragment {...fragProps} d="M218.5 834L227 829.5L226 817L224.5 800L219 810L211.5 832.5L218.5 834Z" fill="#6F3A2B"/>
      <Fragment {...fragProps} d="M233 800L242.5 817L255.5 807L247.5 795.5L233 800Z" fill="#5E372F"/>
      <Fragment {...fragProps} d="M234.5 837L242.5 817L255.5 807L254.5 812.5L245 834.5L234.5 837Z" fill="#723E2D"/>
      <Fragment {...fragProps} d="M226 817L233 800L242.5 817L234.5 837L227 829.5L226 817Z" fill="#541D0D"/>
      <Fragment {...fragProps} d="M262.5 814.5L252 818L259 829.5L273.5 832L273 819.5L262.5 814.5Z" fill="#7A4832"/>
      <Fragment {...fragProps} d="M258.5 837.5L247 829.5L252 818L259 829.5L273.5 832L258.5 837.5Z" fill="#5D2718"/>
      <Fragment {...fragProps} d="M279 833V825.5L283.5 822.5L294.5 828L291.5 838L279 833Z" fill="#513D38"/>
      <Fragment {...fragProps} d="M278 838H291.5L279 833V825.5L283.5 822.5L273 822L273.5 832L269.5 833.5L278 838Z" fill="#5C3119"/>
      <Fragment {...fragProps} d="M261.5 771L223.5 777.5L244 758L261.5 771Z" fill="#61342A"/>
      <Fragment {...fragProps} d="M290.5 798L261.5 771L271.5 762.5L288.5 781.5L316 798H290.5Z" fill="#5C3D3A"/>
      <Fragment {...fragProps} d="M319.5 782.5L316 798L301 789L319.5 782.5Z" fill="#43241C"/>
      <Fragment {...fragProps} d="M291 764.5L319.5 782.5L301 789L288.5 781.5L271.5 762.5L291 764.5Z" fill="#602F23"/>
      <Fragment {...fragProps} d="M274.5 742.5L291 764.5L271.5 762.5L236.5 729.5L274.5 742.5Z" fill="#6A3A2E"/>
      <Fragment {...fragProps} d="M236.5 729.5L219.5 751L244 758L261.5 771L271.5 762.5L236.5 729.5Z" fill="#835146"/>
      <Fragment {...fragProps} d="M208.5 723.5L236.5 729.5L219.5 751L207.5 731.5L178 698L208.5 723.5Z" fill="#CD9783"/>
      <Fragment {...fragProps} d="M207.5 789L202.5 779.5L186 789L205 817.5L207.5 789Z" fill="#5D3728"/>
      <Fragment {...fragProps} d="M645 349.5L585.5 319.5L622.5 371.5L645 349.5Z" fill="#BB8E7A"/>
      <Fragment {...fragProps} d="M592 404.5L622.5 371.5L585.5 319.5L592 404.5Z" fill="#CD987F"/>
      <Fragment {...fragProps} d="M698.5 397.5L645 349.5L622.5 371.5L648.5 386.5L698.5 397.5Z" fill="#E7AF8E"/>
      <Fragment {...fragProps} d="M592 404.5L622.5 371.5L648.5 386.5L592 404.5Z" fill="#AF7F5F"/>
      <Fragment {...fragProps} d="M667.5 424L648.5 386.5L698.5 397.5L714 459L654.5 449L667.5 424Z" fill="#E6AC88"/>
      <Fragment {...fragProps} d="M752 468L698.5 397.5L714 459L752 468Z" fill="#E6AD8A"/>
      <Fragment {...fragProps} d="M622 422L648.5 386.5L667.5 424L622 457.5V422Z" fill="#98654A"/>
      <Fragment {...fragProps} d="M623 472L622 457.5L667.5 424L654.5 449L655 492.5L623 472Z" fill="#946048"/>
      <Fragment {...fragProps} d="M621 501L623 472L583 435.5L592 490.5L621 501Z" fill="#563122"/>
      <Fragment {...fragProps} d="M622 422L623 472L583 435.5L648.5 386.5L622 422Z" fill="#5B362D"/>
      <Fragment {...fragProps} d="M592 404.5L583 435.5L648.5 386.5L592 404.5Z" fill="#865943"/>
      <Fragment {...fragProps} d="M706 529L621 501L623 472L655 492.5L706 529Z" fill="#5E3423"/>
      <Fragment {...fragProps} d="M702 578L621 501L706 529L702 578Z" fill="#65392A"/>
      <Fragment {...fragProps} d="M739.5 621.5L702 578L706 529L749.5 594L808.5 615L836 644.5L756 640.5L739.5 621.5Z" fill="#6F422F"/>
      <Fragment {...fragProps} d="M714 459L706 529L655 492.5L654.5 449L714 459Z" fill="#F6BE9A"/>
      <Fragment {...fragProps} d="M810 543.5L752 468L714 459L771.5 560L816.5 600.5L843 604L810 543.5Z" fill="#E3AA84"/>
      <Fragment {...fragProps} d="M816.5 600.5L808.5 615L749.5 594L706 529L771.5 560L816.5 600.5Z" fill="#D6A586"/>
      <Fragment {...fragProps} d="M714 459L706 529L771.5 560L714 459Z" fill="#F6BE9A"/>
      <Fragment {...fragProps} d="M836 644.5L808.5 615L816.5 600.5L843 604L853.5 625.5L836 644.5Z" fill="#AD755B"/>
      <Fragment {...fragProps} d="M842 674L853.5 625.5L836 644.5L822 659.5L824.5 689.5L842 674Z" fill="#82502F"/>
      <Fragment {...fragProps} d="M790.5 721L824.5 689.5L822 659.5L774 679.5L749 745L790.5 721Z" fill="#834E35"/>
      <Fragment {...fragProps} d="M727 717.5L756 640.5L836 644.5L822 659.5L774 679.5L749 745L727 717.5Z" fill="#6E3F29"/>
      <Fragment {...fragProps} d="M724.5 652.5L739.5 621.5L756 640.5L724.5 652.5Z" fill="#512D16"/>
      <Fragment {...fragProps} d="M719 669L724.5 652.5L756 640.5L727 717.5L719 669Z" fill="#552F27"/>
      <Fragment {...fragProps} d="M691 688.5L719 669L727 717.5L696 742L689 732L691 688.5Z" fill="#513322"/>
      <Fragment {...fragProps} d="M719.5 760L749 745L727 717.5L696 742L708.5 758L719.5 760Z" fill="#784631"/>
      <Fragment {...fragProps} d="M670 730L672 701L654 715L652.5 756L670 730Z" fill="#A2725A"/>
      <Fragment {...fragProps} d="M632.5 726.5L654 715L653.5 737.5L632.5 726.5Z" fill="#F3BE99"/>
      <Fragment {...fragProps} d="M606.5 736L632.5 726.5L653.5 737.5L652.5 756L606.5 736Z" fill="#D3A38A"/>
      <Fragment {...fragProps} d="M559.5 768L606.5 736L578 776.5L559.5 768Z" fill="#492818"/>
      <Fragment {...fragProps} d="M576.5 790.5L578 776.5L606.5 736L652.5 756L644.5 771.5L608 774.5H597L593 779.5L576.5 790.5Z" fill="#522923"/>
      <Fragment {...fragProps} d="M678.5 757.5L670 730L652.5 756L644.5 771.5L653 819L670 824L678.5 757.5Z" fill="#71352D"/>
      <Fragment {...fragProps} d="M612 789.5L605.5 774.5L644.5 771.5L623 799L612 789.5Z" fill="#412014"/>
      <Fragment {...fragProps} d="M697 775L678.5 757.5L670 824L697 775Z" fill="#794B37"/>
      <Fragment {...fragProps} d="M599.5 783L593 779.5L597 774.5H605.5V779.5L599.5 783Z" fill="#75504A"/>
      <Fragment {...fragProps} d="M594.5 795L593 779.5L599.5 783L605.5 779.5V774.5L612 789.5L623 799L594.5 795Z" fill="#613934"/>
      <Fragment {...fragProps} d="M594.5 795L615 823L623 799L594.5 795Z" fill="#7A493E"/>
      <Fragment {...fragProps} d="M636.5 814L623 799L615 823L634.5 830.5L665.5 832.5L670 824L653 819L636.5 814Z" fill="#694132"/>
      <Fragment {...fragProps} d="M585 795.5L594.5 795L590.5 804L580 802.5L585 795.5Z" fill="#4D3327"/>
      <Fragment {...fragProps} d="M582.5 815.5L580 802.5L590.5 804L615 823L594 827.5L582.5 815.5Z" fill="#613328"/>
      <Fragment {...fragProps} d="M594.5 795L590.5 804L615 823L594.5 795Z" fill="#441E14"/>
      <Fragment {...fragProps} d="M570 812.5L582.5 815.5L594 827.5L615 823L634.5 830.5L616.5 841L594 833L574 819L557.5 827V820.5L570 812.5Z" fill="#531E16"/>
      <Fragment {...fragProps} d="M561.5 830.5L557.5 827L574 819L594 833L616.5 841L585.5 833L561.5 830.5Z" fill="#59332D"/>
      <Fragment {...fragProps} d="M551 795L576.5 790.5L578 776.5L551 795Z" fill="#3F211B"/>
      <Fragment {...fragProps} d="M559.5 768L578 776.5L551 795L559.5 768Z" fill="#54322A"/>
      <Fragment {...fragProps} d="M225 806L261.5 771L223.5 777.5L202.5 779.5L207.5 789L215 785L224.5 800L225 806Z" fill="#2F1F1C"/>
      <Fragment {...fragProps} d="M282.5 790.5L261.5 771L225 806L226 817L233 800L247.5 795.5L255.5 807L254.5 812.5L268.5 787.5L282.5 790.5Z" fill="#2F2B26"/>
      <g filter="url(#filter0_d)">
        <Fragment {...fragProps} d="M678.5 757.5L683 749.5L674 743L678.5 757.5Z" fill="#CF6C92"/>
        <Fragment {...fragProps} d="M689 732L683 749.5L680 738L670 730L689 732Z" fill="#CD698C"/>
        <Fragment {...fragProps} d="M711.5 769.5L697 775L708.5 758L711.5 769.5Z" fill="#A75A75"/>
        <Fragment {...fragProps} d="M719.5 760L711.5 769.5L708.5 758L719.5 760Z" fill="#B2507A"/>
        <Fragment {...fragProps} d="M694 760L697 775L678.5 757.5L694 760Z" fill="#CF6C92"/>
        <Fragment {...fragProps} d="M708.5 758L694 760L697 775L708.5 758Z" fill="#EE748A"/>
        <Fragment {...fragProps} d="M684.5 688.5H691L684.5 709.5L676.5 694L684.5 688.5Z" fill="#F2AEC6"/>
        <Fragment {...fragProps} d="M672 701L676.5 694L684.5 709.5L672 701Z" fill="#FFCEE6"/>
        <Fragment {...fragProps} d="M670 730L672 701L684.5 709.5L670 730Z" fill="#EF90B2"/>
        <Fragment {...fragProps} d="M690 711.5L684.5 709.5L691 688.5L690 711.5Z" fill="#D584B5"/>
        <Fragment {...fragProps} d="M689 732L670 730L684.5 709.5L689.5 711.5L689 732Z" fill="#C35E7A"/>
        <Fragment {...fragProps} d="M683 749.5L689 732L708.5 758L683 749.5Z" fill="#C35677"/>
        <Fragment {...fragProps} d="M680 738L683 749.5L674 743L670 730L680 738Z" fill="#EC85A9"/>
        <Fragment {...fragProps} d="M158 709L167 710L169 700L165 695.5L158 709Z" fill="#CF6C92"/>
        <Fragment {...fragProps} d="M173.5 736.5L175 720L159 718L173.5 736.5Z" fill="#DA6B94"/>
        <Fragment {...fragProps} d="M167 710L175 720L159 718L158 709L167 710Z" fill="#C45E7A"/>
        <Fragment {...fragProps} d="M181 749L173.5 736.5L175 720L181 726V749Z" fill="#A64D68"/>
        <Fragment {...fragProps} d="M162.5 749.5L173.5 736.5L159 718L161 735L149 750L162.5 749.5Z" fill="#EC85A9"/>
        <Fragment {...fragProps} d="M160.5 765L162.5 749.5L181 749L160.5 765Z" fill="#AB4F6F"/>
        <Fragment {...fragProps} d="M181 749L162.5 749.5L173.5 736.5L181 749Z" fill="#CD698C"/>
        <Fragment {...fragProps} d="M160.5 765L162.5 749.5L155.5 756L160.5 765Z" fill="#A75A75"/>
        <Fragment {...fragProps} d="M149 750L162.5 749.5L155.5 756L145 755L149 750Z" fill="#EE748A"/>
        <Fragment {...fragProps} d="M143 771.5L160.5 765L154 774H148L143 771.5Z" fill="#BB5D7E"/>
        <Fragment {...fragProps} d="M147 762L143 771.5L160.5 765L155.5 756L145 755L147 762Z" fill="#C45677"/>
        <Fragment {...fragProps} d="M143 771.5L135.5 767L145 755L147 762L143 771.5Z" fill="#B3507A"/>
        <Fragment {...fragProps} d="M173.5 690L178 698L165 695.5L158 690H173.5Z" fill="#FFCEE6"/>
        <Fragment {...fragProps} d="M179.5 712L178 698L165 695.5L179.5 712Z" fill="#D584B5"/>
        <Fragment {...fragProps} d="M157 700L165 695.5L158 709L157 700Z" fill="#A84E67"/>
        <Fragment {...fragProps} d="M158 690L165 695.5L157 700L152.5 690H158Z" fill="#F2AEC6"/>
        <Fragment {...fragProps} d="M167 710L169 700L179.5 712L181 726L175 720L167 710Z" fill="#EC79A3"/>
        <Fragment {...fragProps} d="M694 760L678.5 757.5L683 749.5L694 760Z" fill="#DE7C9A"/>
        <Fragment {...fragProps} d="M708.5 758L694 760L683 749.5L708.5 758Z" fill="#D584B5"/>
      </g>
      <Fragment {...fragProps} d="M298 370.5L283.5 440.5L260 384.5L298 370.5Z" fill="#0F0F0F"/>
      <Fragment {...fragProps} d="M314.5 571L337.5 576L351 612L329 613.5L274 607.5L314.5 571Z" fill="black"/>
      <Fragment {...fragProps} d="M289 539L314.5 571L274 607.5L289 539Z" fill="black"/>
      <Fragment {...fragProps} d="M282 499.5L289 539L239 536.5L282 499.5Z" fill="#131313"/>
      <Fragment {...fragProps} d="M249 601.5L274 607.5L289 539L249 601.5Z" fill="#0C0C0C"/>
      <Fragment {...fragProps} d="M240.5 572L249 601.5L289 539L239 536.5L240.5 572Z" fill="#181818"/>
      <Fragment {...fragProps} d="M239 519V536.5L282 499.5L256 461L239 519Z" fill="#181818"/>
      <Fragment {...fragProps} d="M260 384.5L256 461L282 499.5L283.5 440.5L260 384.5Z" fill="#202020"/>
      <Fragment {...fragProps} d="M269 321L298 370.5L308 311L269 321Z" fill="#232323"/>
      <Fragment {...fragProps} d="M298 370.5L260 384.5L269 321L298 370.5Z" fill="black"/>
      <Fragment {...fragProps} d="M276.5 306L269 321L308 311L311 304L276.5 306Z" fill="#414141"/>
      <Fragment {...fragProps} d="M363 52L314.5 65L328.5 152L363 52Z" fill="#433227"/>
      <Fragment {...fragProps} d="M358.5 22.5L363 52L402.5 7L358.5 22.5Z" fill="#433227"/>
      <Fragment {...fragProps} d="M417 40.5L402.5 7L427.5 0L446 20L417 40.5Z" fill="#38271C"/>
      <Fragment {...fragProps} d="M466 8L446 20L427.5 0L466 8Z" fill="#251F1A"/>
      <Fragment {...fragProps} d="M490.5 23.5L466 8L446 20L462.5 62L490.5 23.5Z" fill="#432F22"/>
      <Fragment {...fragProps} d="M446 20L417 40.5L462.5 62L446 20Z" fill="#594131"/>
      <Fragment {...fragProps} d="M363 52L348.5 94L417 40.5L402.5 7L363 52Z" fill="#38281E"/>
      <Fragment {...fragProps} d="M358.5 22.5L363 52L314.5 65L358.5 22.5Z" fill="#35261C"/>
      <Fragment {...fragProps} d="M328.5 152L348.5 94L380 174L328.5 152Z" fill="#604433"/>
      <Fragment {...fragProps} d="M380 174L417 40.5L426.5 138L399 270.5L380 174Z" fill="#402D20"/>
      <Fragment {...fragProps} d="M380 174L348.5 94L417 40.5L380 174Z" fill="#4D3729"/>
      <Fragment {...fragProps} d="M462.5 62L417 40.5L426.5 138L462.5 96V62Z" fill="#533827"/>
      <Fragment {...fragProps} d="M497 29.5L490.5 23.5L462.5 62V96L500.5 60.5L497 29.5Z" fill="#362317"/>
      <Fragment {...fragProps} d="M534 64.5L497 29.5L500.5 60.5L534 64.5Z" fill="#433227"/>
      <Fragment {...fragProps} d="M527.5 127L514 112L500.5 60.5L534 64.5L527.5 127Z" fill="#3F2A1C"/>
      <Fragment {...fragProps} d="M514 112L527.5 127L520.5 195.5L499.5 271L483 196.5L514 112Z" fill="#664C3B"/>
      <Fragment {...fragProps} d="M483 196.5L499.5 271L426.5 138L483 196.5Z" fill="#37281E"/>
      <Fragment {...fragProps} d="M399 270.5L426.5 138L499.5 271L465.5 436L399 270.5Z" fill="#513B2F"/>
      <Fragment {...fragProps} d="M483 196.5L426.5 138L460 99L503 142L483 196.5Z" fill="#433227"/>
      <Fragment {...fragProps} d="M460 99L503 142L514 112L500.5 60.5L462.5 96L460 99Z" fill="#4C3424"/>
      <Fragment {...fragProps} d="M348 212L287.5 194L328.5 152L348 212Z" fill="#987A67"/>
      <Fragment {...fragProps} d="M380 174L348 212L328.5 152L380 174Z" fill="#4B3221"/>
      <Fragment {...fragProps} d="M287.5 194L348 212L344 267L287.5 194Z" fill="#B0935B"/>
      <Fragment {...fragProps} d="M399 270.5L361.5 396L339.5 329.5L399 270.5Z" fill="#9B7050"/>
      <Fragment {...fragProps} d="M380 174L339.5 329.5L348 212L380 174Z" fill="#433227"/>
      <Fragment {...fragProps} d="M399 270.5L339.5 329.5L380 174L399 270.5Z" fill="#6A4B2E"/>
      <Fragment {...fragProps} d="M525.5 439L556.5 404V339L525.5 439Z" fill="#A38958"/>
      <Fragment {...fragProps} d="M499.5 271L520.5 195.5L539 269L465.5 436L499.5 271Z" fill="#745C4C"/>
      <Fragment {...fragProps} d="M556.5 339L539 269L465.5 436L556.5 339Z" fill="#433227"/>
      <Fragment {...fragProps} d="M399 270.5L361.5 396L413.5 483L464.5 513L399 270.5Z" fill="#7E5F4A"/>
      <Fragment {...fragProps} d="M445.5 708.5L390.5 802L399.5 606L445.5 708.5Z" fill="#6E5747"/>
      <Fragment {...fragProps} d="M472 733.5L485.5 819V833L453 809.5L472 733.5Z" fill="#665341"/>
      <Fragment {...fragProps} d="M485.5 819L472 733.5L502 788.5L485.5 833V819Z" fill="#B9A070"/>
      <Fragment {...fragProps} d="M480.5 650L498.5 710.5L472 733.5L480.5 650Z" fill="#715747"/>
      <Fragment {...fragProps} d="M413.5 483L464.5 513V578L461 649L445.5 708.5L413.5 483Z" fill="#A18462"/>
      <Fragment {...fragProps} d="M509 557L464.5 577.5L512.5 510.5L509 557Z" fill="#5F4C40"/>
      <Fragment {...fragProps} d="M512.5 510.5L556.5 404L547.5 492L566 550L512.5 510.5Z" fill="#6A5548"/>
      <Fragment {...fragProps} d="M566 550L539 642.5V569L512.5 510.5L566 550Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M566 550L571.5 593L609 486.5L566 550Z" fill="#9F733E"/>
      <Fragment {...fragProps} d="M339.5 329.5L312.5 383L304.5 323.5L339.5 329.5Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M525.5 439L556.5 339L465.5 436L464.5 513L525.5 439Z" fill="#725A4A"/>
      <Fragment {...fragProps} d="M464.5 513L465.5 436L399 270.5L464.5 513Z" fill="#8C6E4A"/>
      <Fragment {...fragProps} d="M413.5 483L399.5 606L361.5 396L413.5 483Z" fill="#9D7A51"/>
      <Fragment {...fragProps} d="M445.5 708.5L413.5 483L399.5 606L445.5 708.5Z" fill="#80604B"/>
      <Fragment {...fragProps} d="M445.5 708.5L461 649L464.5 577.5L480.5 650L472 733.5L445.5 708.5Z" fill="#BC9F67"/>
      <Fragment {...fragProps} d="M464.5 577.5L512.5 510.5L556.5 404L525.5 439L464.5 513V577.5Z" fill="#C8A86A"/>
      <Fragment {...fragProps} d="M509 557L498.5 710.5L480.5 650L464.5 577.5L509 557Z" fill="#6A4C38"/>
      <Fragment {...fragProps} d="M539 642.5L509 557L512.5 510.5L539 569V642.5Z" fill="#CAAE77"/>
      <Fragment {...fragProps} d="M589.5 304L596.5 394.5L590 437L556.5 404V339L589.5 304Z" fill="#C9A96C"/>
      <Fragment {...fragProps} d="M569 181.5L534 64.5L550.5 210L556.5 339L569 181.5Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M287.5 194L314.5 65L328.5 152L287.5 194Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M282 404.5L304.5 323.5L312.5 383L282 404.5Z" fill="#F6DDAA"/>
      <Fragment {...fragProps} d="M306.5 445.5L312.5 383L361.5 396L306.5 445.5Z" fill="#DBBA7A"/>
      <Fragment {...fragProps} d="M329.5 583.5L338.5 527.5L361.5 396L399.5 606L329.5 583.5Z" fill="#CEB26A"/>
      <Fragment {...fragProps} d="M354.5 671L329.5 583.5L399.5 606L354.5 671Z" fill="#DFBA70"/>
      <Fragment {...fragProps} d="M472 733.5L502 788.5L480.5 846.5L521.5 812.5L532 783L472 733.5Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M498.5 710.5L532 783L472 733.5L498.5 710.5Z" fill="#D0B276"/>
      <Fragment {...fragProps} d="M547.5 492L556.5 404L590 437L547.5 492Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M498.5 710.5L509 557L539 642.5L532 783L498.5 710.5Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M593.5 622.5L606.5 691.5L575.5 669L571.5 593L593.5 622.5Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M611.5 537L571.5 593L593.5 622.5L611.5 537Z" fill="#CDAE71"/>
      <Fragment {...fragProps} d="M590 437L609 486.5L566 550L547.5 492L590 437Z" fill="#D6BD6D"/>
      <Fragment {...fragProps} d="M339.5 329.5L344 267L287.5 194L300.5 241L339.5 329.5Z" fill="#ECC57A"/>
      <Fragment {...fragProps} d="M304.5 323.5L300.5 241L339.5 329.5L304.5 323.5Z" fill="#F1DAAD"/>
      <Fragment {...fragProps} d="M361.5 396L312.5 383L339.5 329.5L361.5 396Z" fill="#C8A666"/>
      <Fragment {...fragProps} d="M589.5 304L562 270L556.5 339L589.5 304Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M338.5 527.5L306.5 445.5L361.5 396L338.5 527.5Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M390.5 802L354.5 671L399.5 606L390.5 802Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M454.5 837L407 774L445.5 708.5L472 733.5L453 810L454.5 837Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M556.5 808L532 783L576.5 751L556.5 789.5V808Z" fill="#EDCC8B"/>
      <Fragment {...fragProps} d="M576.5 751L532 783L539 642.5L576.5 751Z" fill="#FCE3B3"/>
      <Fragment {...fragProps} d="M592 681L576.5 751L539 642.5L592 681Z" fill="#D2BA8A"/>
      <Fragment {...fragProps} d="M566 550L571.5 593L575.5 669L539 642.5L566 550Z" fill="#7B5735"/>
      <Fragment {...fragProps} d="M520.5 195.5L556.5 339L550.5 210L534 64.5L520.5 195.5Z" fill="#AA8D60"/>
      <Fragment {...fragProps} d="M611.5 537L571.5 593L609 486.5L611.5 537Z" fill="#433227"/>
      <defs>
        <filter id="filter0_d" x="85.5" y="642.5" width="684" height="186.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="25"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.490196 0 0 0 0 0.737255 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>
    </>
  )
}

export default Taya